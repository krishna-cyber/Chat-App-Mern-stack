import { useForm } from "react-hook-form";
import server from "../../utils/server";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await server
      .post("/login", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=' h-screen bg-blue-200 flex justify-center items-center flex-col'>
      <form
        className=' p-9 rounded flex flex-col gap-5 p-3 border-2 border-solid border-slate-400'
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className=' text-center font-semibold text-3xl text-blue-700'>
          Login
        </h2>

        <div className='form-control'>
          <input
            className='input'
            {...register("email", { required: true })}
            placeholder='email'
          />
          {errors.username && (
            <span className=' block text-purple-800'>
              This field is required
            </span>
          )}
        </div>
        <div className='form-control'>
          <input
            className='input'
            {...register("password", { required: true })}
            placeholder='Password'
          />
          {errors.password && (
            <span className=' block text-purple-800'>
              This field is required
            </span>
          )}
        </div>

        <button
          className='input bg-blue-600 text-white hover:bg-blue-700 '
          type='submit'>
          Login
        </button>
      </form>
      <p className='text-lg mt-3'>
        Not registered yet?{" "}
        <span className=' text-green-600 underline cursor-pointer'>
          <Link to='/'>Register</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;