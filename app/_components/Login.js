'use client';

import { useState } from 'react';
import SignInGoogleButton from './SignInGoogleButton';
import SignInGitHubButton from './SignInGitHubButton';
import { signInRegularAction } from '../_lib/actions';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import SpinnerMini from './SpinnerMini';
import LinkItem from './LinkItem';
import LinkItemSignUp from './LinkItemSignUp';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!email || !password) return;
    setIsSubmitting(true);
    try {
      setErr('');
      await signInRegularAction(email, password);
    } catch (error) {
      setErr('*Invalid email or password 🧐');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center mt-10'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-5'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10'>
            🐷 Welcome! 👋🏼 <br />
            Login to your account
          </h2>
          <div className='mb-4'>
            <label className='dark:text-gray-200'>Email:</label>
            <input
              type='email'
              maxLength={25}
              placeholder="'admin@admin.com' for testing"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='relative mb-6'>
            <label className='dark:text-gray-200'>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              maxLength={15}
              placeholder="'admin' for testing"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 flex items-center px-3 mt-3'
            >
              {showPassword ? (
                <RiEyeOffLine className='h-5 w-5 text-gray-400' />
              ) : (
                <RiEyeLine className='h-5 w-5 text-gray-400' />
              )}
            </button>
            <p className='text-red-500 text-center'>{err}</p>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-primary-800 px-5 py-3 text-white text-lg font-semibold transition-all rounded-full'
            >
              {isSubmitting ? <SpinnerMini /> : 'Login'}
            </button>
          </div>
          <div className='flex items-center justify-center mt-8 mb-4'>
            <div className='border-t border-gray-300 dark:border-gray-600 w-full mx-4'></div>
            <span className='text-gray-500 dark:text-gray-400 px-4'>or</span>
            <div className='border-t border-gray-300 dark:border-gray-600 w-full mx-4'></div>
          </div>
        </form>
        <div className='flex flex-col justify-center items-center gap-3 m-7'>
          <SignInGoogleButton />
          <SignInGitHubButton />
          <LinkItemSignUp href='/signup' msg='Sign up for free' />
        </div>
      </div>
    </div>
  );
}

export default Login;
