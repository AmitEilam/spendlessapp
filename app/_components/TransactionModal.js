'use client';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { updateTransaction } from '../_lib/actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SpinnerMini from './SpinnerMini';

function TransactionModal({
  isOpen,
  onClose,
  category,
  price,
  date,
  notes,
  id,
  type,
  rawCategory,
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editType, setEditType] = useState(type);
  const [editCategory, setEditCategory] = useState(rawCategory);
  const [editPrice, setEditPrice] = useState(price);
  const [editNotes, setEditNotes] = useState(notes || '');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsEditing(false);
      setEditType(type);
      setEditCategory(rawCategory);
      setEditPrice(price);
      setEditNotes(notes || '');
    }
  }, [isOpen, type, rawCategory, price, notes]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!editType || !editCategory || !editPrice) return;

    setIsSubmitting(true);
    try {
      await updateTransaction(
        id,
        editType,
        editCategory,
        Number(editPrice),
        editNotes
      );
      toast.success('Transaction updated! 🐷');
      router.refresh();
      onClose();
    } catch (error) {
      toast.error('Failed to update transaction! 💔');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'
      onClick={onClose}
    >
      <div
        className='bg-white dark:bg-gray-900 rounded-lg p-5 px-8 max-w-md w-full mx-4 relative shadow-xl dark:shadow-2xl dark:shadow-black/50 border border-gray-200 dark:border-gray-600'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-primary-800 dark:text-purple-300'
        >
          <IoClose size={24} />
        </button>

        {!isEditing ? (
          <>
            <div className='flex items-center gap-2 mb-4'>
              <h2 className='text-xl font-bold dark:text-gray-100'>Transaction Details</h2>
              <button
                onClick={() => setIsEditing(true)}
                className='text-primary-800 dark:text-purple-300 hover:text-primary-600 dark:hover:text-purple-200 transition-colors'
                title='Edit transaction'
              >
                <FiEdit2 size={18} />
              </button>
            </div>
            <div className='mb-4 flex'>
              <p className='font-semibold mr-2'>📅</p>
              <p className='dark:text-gray-200'>{date}</p>
            </div>
            <div className='mb-4 flex'>
              <p className='font-semibold mr-2'>📍</p>
              <p className='dark:text-gray-200'>{category}</p>
            </div>
            <div className='mb-4 flex'>
              <p className='font-semibold mr-2'>💰</p>
              <p className='dark:text-gray-200'>
                {price}
                &#8362;
              </p>
            </div>
            {notes && (
              <div className='mb-4 flex'>
                <p className='font-semibold mr-2'>📝</p>
                <p className='dark:text-gray-200'>{notes}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className='text-xl font-bold mb-6 dark:text-gray-100'>Edit Transaction</h2>
            <form onSubmit={handleSubmit}>
              <label className='block mb-4 dark:text-gray-200'>
                Type:
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                  required
                >
                  <option value='income'>Income</option>
                  <option value='expense'>Expense</option>
                </select>
              </label>
              <label className='block mb-4 dark:text-gray-200'>
                Category:
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                  required
                >
                  <option value='nightout'>Nightout</option>
                  <option value='car'>Car</option>
                  <option value='supermarket'>Supermarket</option>
                  <option value='restaurant'>Restaurant</option>
                  <option value='transfer'>Transfer</option>
                  <option value='shopping'>Shopping</option>
                  <option value='other'>Other</option>
                </select>
              </label>
              <label className='block mb-4 dark:text-gray-200'>
                Price:
                <input
                  type='number'
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                  placeholder='Enter Price'
                  required
                />
              </label>
              <label className='block mb-6 dark:text-gray-200'>
                Notes:
                <textarea
                  value={editNotes}
                  maxLength={35}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className='border dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-100'
                  placeholder='Not required, but recommended'
                  rows='3'
                />
              </label>
              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  className='text-primary-800 dark:text-purple-300 px-4 py-2 bg-white dark:bg-gray-700 text-sm font-semibold transition-all rounded-full border border-primary-800 dark:border-purple-300'
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-primary-800 px-4 py-2 text-white text-sm font-semibold transition-all rounded-full min-w-[80px]'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <SpinnerMini /> : 'Save'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export default TransactionModal;
