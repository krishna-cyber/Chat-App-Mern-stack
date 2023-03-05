import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className=' h-screen bg-blue-200 flex justify-center items-center'>
      <form
        className=' flex flex-col gap-5 p-3 '
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className=' text-center font-semibold text-3xl text-blue-700'>
          Register
        </h2>
        <div className='form-control'>
          <input
            className='input'
            {...register("username", { required: true })}
            placeholder='Username'
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
