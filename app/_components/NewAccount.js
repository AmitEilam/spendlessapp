'use client';
import { useState } from 'react';
import { createFixed } from '../_lib/data-service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function NewAccount({ user }) {
  const [salary, setSalary] = useState('');
  const [rent, setRent] = useState('');
  const [currentExpenses, setCurrentExpenses] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!salary || !currentExpenses) return;
    try {
      setErr('');
      if (currentExpenses)
        await createFixed(user, 'expense', 'currentExpenses', currentExpenses);
      if (salary) await createFixed(user, 'income', 'salary', salary);
      if (rent) await createFixed(user, 'expense', 'rent', rent);
      setSalary('');
      setRent('');
      setCurrentExpenses('');
      toast.success('Your details successfully added! 🐷');
      router.refresh();
      setTimeout(() => {
        router.push('/dashboard');
      }, 300);
    } catch (error) {
      toast.error('Failed to add details! 💔');
      setErr('*Invalid details 🧐');
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={submitHandler} className='border p-10 bg-white'>
        <h2 className='sm: text-2xl font-bold text-center text-gray-800 mb-10'>
          🐷 Welcome! 👋🏼 <br />
          We need a few details to start
        </h2>
        <div className='mb-4'>
          <label>What is your regular income? (salary, etc.)</label>
          <input
            type='number'
            placeholder='Type here ...'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label>What is the rent you pay? (if any. otherwise leave it)</label>
          <input
            type='number'
            placeholder='Type here ...'
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-6'>
          <label>
            What is your current expenses (electricity, water, gas, property
            tax, internet, etc. )?
          </label>
          <input
            type='number'
            placeholder='Type here ...'
            value={currentExpenses}
            onChange={(e) => setCurrentExpenses(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
          <p className='text-red-700 text-center'></p>
        </div>
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-primary-800 px-5 py-3 text-white text-lg font-semibold transition-all rounded-full'
          >
            Lets start!
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAccount;
