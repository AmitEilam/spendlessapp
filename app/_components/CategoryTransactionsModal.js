'use client';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { handlerCategory } from '../_utils/categoryUtils';
import { format } from 'date-fns';

function CategoryTransactionsModal({ isOpen, onClose, category, transactions, type }) {
  const { title, iconCat, bgColor } = handlerCategory(category, 'dashboard');

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = transactions.reduce((sum, t) => sum + t.price, 0);

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4'
      onClick={onClose}
    >
      <div
        className='bg-white dark:bg-gray-900 rounded-lg p-6 max-w-lg w-full max-h-[80vh] flex flex-col relative shadow-xl dark:shadow-2xl dark:shadow-black/50 border border-gray-200 dark:border-gray-600'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-primary-800 dark:text-purple-300'
        >
          <IoClose size={24} />
        </button>

        <div className='flex items-center gap-3 mb-4'>
          <div className={`${bgColor} text-2xl rounded-full p-2`}>
            {iconCat}
          </div>
          <div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} this month
            </p>
          </div>
        </div>

        <div className={`text-2xl font-bold mb-4 ${type === 'expense' ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
          {type === 'expense' ? '-' : ''}{total.toLocaleString('en-US')}₪
        </div>

        <div className='overflow-y-auto flex-1 border-t dark:border-gray-700 pt-4'>
          {transactions.length > 0 ? (
            <div className='space-y-3'>
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
                >
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {format(new Date(t.created_at), 'dd MMM yyyy')}
                    </p>
                    {t.notes && (
                      <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                        {t.notes}
                      </p>
                    )}
                  </div>
                  <p className={`font-semibold ${type === 'expense' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {type === 'expense' ? '-' : ''}{t.price.toLocaleString('en-US')}₪
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500 dark:text-gray-400 py-4'>
              No transactions found
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CategoryTransactionsModal;

