import React from "react";
import { useForm } from "react-hook-form";
const Chat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <section className=' h-screen flex'>
      <div className=' w-1/3 bg-blue-200'>contacts</div>
      <div className=' w-2/3 bg-blue-50 flex p-2 flex-col'>
        <div className=' flex-grow'>messages</div>

        <form
          className=' flex gap-2 items-center'
          onSubmit={handleSubmit(onsubmit)}>
          <input
            {...register("message", { required: true })}
            type='text'
            className=' p-2 border-2 rounded flex-grow'
            placeholder='Enter your message here...'
          />
          <button type='submit' className=' bg-blue-500 p-2 rounded text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-6 h-6'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
