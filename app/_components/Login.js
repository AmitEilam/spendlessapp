'use client';

import { useState } from 'react';
import SignInGoogleButton from './SignInGoogleButton';
import { signInRegularAction } from '../_lib/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setErr('');
      await signInRegularAction(email, password);
    } catch (error) {
      setErr('*Invalid email or password 🧐');
    }
  };

  return (
    <div className='flex items-center justify-center mt-40'>
      <div className='w-full max-w-md bg-white shadow-md rounded p-5'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-10'>
            🐷 Welcome! 👋🏼 <br />
            Login to your account
          </h2>
          <div className='mb-4'>
            <label>Email:</label>
            <input
              type='email'
              placeholder='expample@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-6'>
            <label>Password:</label>
            <input
              type='password'
              placeholder='Use strong password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            <p className='text-red-700 text-center'>{err}</p>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='bg-purple-800 px-6 py-4 text-white text-lg font-semibold transition-all rounded-full'
            >
              Login
            </button>
          </div>
          <div className='flex items-center justify-center mt-8 mb-4'>
            <div className='border-t border-gray-300 w-full mx-4'></div>
            <span className='text-gray-500 px-4'>or</span>
            <div className='border-t border-gray-300 w-full mx-4'></div>
          </div>
        </form>
        <div className='flex justify-center items-center m-7'>
          <SignInGoogleButton />
        </div>
      </div>
    </div>
  );
}

export default Login;
