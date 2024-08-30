'use client';
import { useState } from 'react';
import { updateFixed, updateUser } from '../_lib/data-service';
import toast from 'react-hot-toast';
import { RiEyeCloseFill, RiEyeCloseLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import FormInput from './FormInput';

function EditProfile({
  user,
  salaryDb,
  rentDb,
  currentExpensesDb,
  firstNameDb,
  lastNameDb,
  emailDb,
  passwordDb,
}) {
  const [salary, setSalary] = useState(salaryDb);
  const [rent, setRent] = useState(rentDb);
  const [currentExpenses, setCurrentExpenses] = useState(currentExpensesDb);
  const [firstName, setFirstName] = useState(firstNameDb);
  const [lastName, setLastName] = useState(lastNameDb);
  const [email, setEmail] = useState(emailDb);
  const [password, setPassword] = useState(passwordDb);
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!salary || !currentExpenses) return;
    try {
      setErr('');
      await updateFixed(user, 'salary', +salary);
      await updateFixed(user, 'currentExpenses', +currentExpenses);
      if (rent) await updateFixed(user, 'rent', +rent);
      await updateUser(user, email, password, firstName, lastName);
      toast.success('Your details successfully added! 🐷');
    } catch (error) {
      toast.error('Failed to update the details! 💔');
      setErr('*Invalid details 🧐');
      console.log(error);
    }
    router.refresh();
  };

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={submitHandler} className='border p-10 bg-white'>
        <h2 className='sm:text-2xl font-bold text-center text-gray-800 mb-10'>
          ✍🏻 Edit your account details 🐷
        </h2>
        <div className='mb-4'>
          <FormInput
            label='Your first name'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required={true}
          />
        </div>
        <div className='mb-4'>
          <FormInput
            label='Your last name'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required={true}
          />
        </div>
        <div className='mb-4'>
          <FormInput
            label='Your email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </div>
        <div className='relative mb-4'>
          {password ? (
            <>
              {' '}
              <label>Your password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Type here ...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10'
                required
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 flex items-center px-3 mt-5'
              >
                {showPassword ? (
                  <RiEyeCloseLine className='h-5 w-5 text-gray-400' />
                ) : (
                  <RiEyeCloseFill className='h-5 w-5 text-gray-400' />
                )}
              </button>
            </>
          ) : (
            ''
          )}
        </div>
        <div className='mb-4'>
          <FormInput
            label='What is your regular income? (salary, etc.)'
            type='number'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required={true}
          />
        </div>
        <div className='mb-4'>
          <FormInput
            label='What is the rent you pay? (if any. otherwise leave it)'
            type='number'
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required={false}
          />
        </div>
        <div className='mb-6'>
          <FormInput
            label='What is your current expenses? (electricity, water, gas, property
            tax, internet, etc.)'
            type='number'
            value={currentExpenses}
            onChange={(e) => setCurrentExpenses(e.target.value)}
            required={true}
          />
          <p className='text-red-700 text-center'></p>
        </div>
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-primary-800 px-5 py-3 mx-5 text-white text-lg font-semibold transition-all rounded-full'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
