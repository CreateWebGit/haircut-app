import React from 'react';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Fyll i detaljer</h1>
        <form className='flex flex-col gap-3'>
          <input
            type='text'
            placeholder='Email'
          />
          <input
            type='password'
            placeholder='Password'
          />
          <button className='bg-green-600 text-white font-bold curser-pointer px-6 py-2'>
            Login
          </button>

          <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
            Error messages
          </div>
          <Link
            className='text-sm mt-3 text-right'
            href={'/register'}
          >
            Inget konto? <span className='underline'>Registrera</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
