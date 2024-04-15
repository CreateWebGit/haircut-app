'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(true);

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>trkkklj</h1>
        <form className='flex flex-col gap-3'>
          <input
            type='text'
            placeholder='Namn'
          />
          <input
            type='text'
            placeholder='Email'
          />
          <input
            type='password'
            placeholder='Password'
          />
          <button className='bg-green-600 text-white font-bold curser-pointer px-6 py-2'>
            Registrera
          </button>

          <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
            Error messages
          </div>
        </form>
      </div>
    </div>
  );
}
