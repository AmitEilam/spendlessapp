'use client';
import { deleteTransaction } from '../_lib/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handlerCategory } from '../_utils/categoryUtils';
import { useState, useCallback } from 'react';
import TransactionModal from './TransactionModal';
import { format } from 'date-fns';

function Transaction({ category, price, type, date, notes, id }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = format(date, 'dd.MM.yy');

  const { title, iconCat, bgColor } = handlerCategory(category, 'transaction');
  const borderColor = type === 'income' ? 'inner-border-green' : 'inner-border-red';

  const deleteHandler = useCallback(async (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        toast.success('Transaction successfully deleted! 🐷');
        router.refresh();
      } catch {
        toast.error('Failed to delete transaction! 💔');
      }
    }
  }, [id, router]);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div
        onClick={toggleModal}
        className={`flex justify-between bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 max-w-2xl mx-auto my-4 border border-gray-200 dark:border-gray-700 inner-border-left ${borderColor} transition-transform transform hover:shadow-lg fade-in cursor-pointer`}
      >
        <div className='flex items-center'>
          <button
            onClick={deleteHandler}
            className='px-2 py-1 mr-2 text-xs font-bold rounded-full border bg-white dark:bg-gray-700 text-primary-800 dark:text-purple-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition-colors'
          >
            X
          </button>
          <div className={`${bgColor} text-2xl rounded-full p-2 m-1`}>
            {iconCat}
          </div>
          <div className='ml-1'>
            <h1 className='text-lg sm:text-xl'>{title}</h1>
            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {formattedDate}
              </span>
              {notes && (
                <>
                  <span className='hidden sm:inline text-gray-300 dark:text-gray-600'>•</span>
                  <p className='text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px] sm:max-w-[200px]'>
                    {notes}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <h1
          className={`text-xl sm:text-2xl self-center ${
            type === 'income' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
          }`}
        >
          {type === 'income'
            ? price.toLocaleString('en-US')
            : '-' + price.toLocaleString('en-US')}
          &#8362;
        </h1>
      </div>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        category={title}
        price={price}
        date={formattedDate}
        notes={notes}
        id={id}
        type={type}
        rawCategory={category}
      />
    </>
  );
}

export default Transaction;
