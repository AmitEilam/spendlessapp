'use client';
import { useState } from 'react';
import { handlerCategory } from '../_utils/categoryUtils';
import CategoryTransactionsModal from './CategoryTransactionsModal';

function Stat({ value, type, category, transactions = [], isFixed = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, iconCat, bgColor } = handlerCategory(category, 'dashboard');

  // Filter transactions for this category
  const categoryTransactions = transactions.filter(
    (t) => t.category === category && t.type === type
  );

  const isClickable = !isFixed && categoryTransactions.length > 0;

  return (
    <>
      <div
        onClick={isClickable ? () => setIsModalOpen(true) : undefined}
        className={`flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 m-6 w-[230px] my-4 border border-gray-200 dark:border-gray-700 inner-border-left transition-transform transform fade-in ${
          isClickable ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''
        }`}
      >
        <div className='flex items-center justify-center'>
          <div className={`${bgColor} text-2xl rounded-full p-2 m-1`}>
            {iconCat}
          </div>
          <div>{title}</div>
        </div>
        {type === 'expense' ? (
          <div className='font-medium text-2xl text-red-700 dark:text-red-400 mt-3'>
            -{value.toLocaleString('en-US')}&#8362;
          </div>
        ) : (
          <div className='font-medium text-2xl text-green-700 dark:text-green-400 mt-3'>
            {value.toLocaleString('en-US')}&#8362;
          </div>
        )}
        {isFixed && (
          <div className='text-xs text-gray-400 mt-2'>Fixed monthly</div>
        )}
      </div>

      {isClickable && (
        <CategoryTransactionsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={category}
          transactions={categoryTransactions}
          type={type}
        />
      )}
    </>
  );
}

export default Stat;
