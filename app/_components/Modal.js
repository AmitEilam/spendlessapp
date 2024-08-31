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
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!type || !category || !price) return;
    setIsSubmitting(true);
    try {
      setErr('');
      await createTransaction(user, type, category, price, notes);
      toggleModal();
      toast.success('Transaction successfully added! 🐷');
    } catch (error) {
      toast.error('Failed to add transaction! 💔');
      setErr('*Invalid email or password 🧐');
      console.log(err);
    } finally {
      setIsSubmitting(false);
      router.refresh();
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
          className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'
        >
          <h2 className='text-xl font-bold mb-6'>Add New Transaction</h2>
          <form onSubmit={handleSubmit}>
            <label className='block mb-4'>
              Type:
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='border p-2 rounded w-full'
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
                className='border p-2 rounded w-full'
                required
              >
                <option value='' disabled>
                  Select category
                </option>
                <option value='nightout'>nightout</option>
                <option value='car'>car</option>
                <option value='supermarket'>supermarket</option>
                <option value='restaurant'>restaurant</option>
                <option value='transfer'>transfer</option>
                {/* Add more categories as needed */}
              </select>
            </label>
            <label className='block mb-4'>
              Price:
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='border p-2 rounded w-full'
                placeholder='Enter Price'
                required
              />
            </label>
            <label className='block mb-6'>
              Notes:
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className='border p-2 rounded w-full'
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
                className='text-primary-800 px-5 py-3 bg-white text-lg font-semibold transition-all rounded-full border border-primary-800'
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
