import { useState } from 'react';
import { createTransaction } from '../_lib/data-service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SpinnerMini from './SpinnerMini';

function Modal({ modalRef, toggleModal, user }) {
  const router = useRouter();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!type || !category || !price) return;
    setIsSubmitting(true);
    try {
      await createTransaction(user, type, category, price, notes);
      toggleModal();
      toast.success('Transaction successfully added! 🐷');
      router.refresh();
    } catch (error) {
      toast.error('Failed to add transaction! 💔');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className='fixed inset-0 bg-black opacity-50 z-40'
        onClick={toggleModal}
      />
      <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
        <div
          ref={modalRef}
          className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full'
        >
          <h2 className='text-xl font-bold mb-6'>Add New Transaction</h2>
          <form onSubmit={handleSubmit}>
            <label className='block mb-4'>
              Type:
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                required
              >
                <option value='' disabled>
                  Select type
                </option>
                <option value='income'>Income</option>
                <option value='expense'>Expense</option>
              </select>
            </label>
            <label className='block mb-4'>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                required
              >
                <option value='' disabled>
                  Select category
                </option>
                <option value='nightout'>Nightout</option>
                <option value='car'>Car</option>
                <option value='supermarket'>Supermarket</option>
                <option value='restaurant'>Restaurant</option>
                <option value='transfer'>Transfer</option>
                <option value='shopping'>Shopping</option>
                <option value='other'>Other</option>
              </select>
            </label>
            <label className='block mb-4'>
              Price:
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                placeholder='Enter Price'
                required
              />
            </label>
            <label className='block mb-6'>
              Notes:
              <textarea
                value={notes}
                maxLength={35}
                onChange={(e) => setNotes(e.target.value)}
                className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                placeholder='Not required, but recommended'
                rows='4'
              />
            </label>
            <div className='flex justify-end space-x-4'>
              <button
                type='submit'
                className='bg-primary-800 px-5 py-3 text-white text-lg font-semibold transition-all rounded-full'
                disabled={isSubmitting}
              >
                {isSubmitting ? <SpinnerMini /> : 'Submit'}
              </button>
              <button
                type='button'
                className='text-primary-800 dark:text-purple-400 px-5 py-3 bg-white dark:bg-gray-700 text-lg font-semibold transition-all rounded-full border border-primary-800 dark:border-purple-400'
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
