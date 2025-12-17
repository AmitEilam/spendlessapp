'use client';
import { FaPlus, FaLightbulb } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';

function EmptyState({ userId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const tips = [
    'Track every expense to see where your money goes',
    'Add notes to transactions for better clarity',
    'Review your spending weekly to stay on budget',
  ];

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
      {/* Piggy Bank Illustration */}
      <div className='relative mb-8'>
        <div className='w-32 h-32 bg-gradient-to-br from-pink-200 to-pink-300 dark:from-pink-800 dark:to-pink-900 rounded-full flex items-center justify-center shadow-lg'>
          <span className='text-6xl'>🐷</span>
        </div>
        <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-primary-800 dark:bg-purple-600 rounded-full flex items-center justify-center shadow-md'>
          <span className='text-2xl'>💰</span>
        </div>
      </div>

      {/* Main Message */}
      <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center'>
        No transactions yet
      </h2>
      <p className='text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md'>
        Start tracking your finances by adding your first transaction. Every journey begins with a single step!
      </p>

      {/* CTA Button */}
      <button
        onClick={toggleModal}
        className='flex items-center gap-2 px-6 py-3 bg-primary-800 dark:bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-10'
      >
        <FaPlus />
        Add Your First Transaction
      </button>

      {/* Tips Section */}
      <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 max-w-md w-full'>
        <div className='flex items-center gap-2 mb-4'>
          <FaLightbulb className='text-yellow-500' />
          <h3 className='font-semibold text-gray-800 dark:text-gray-100'>
            Quick Tips
          </h3>
        </div>
        <ul className='space-y-3'>
          {tips.map((tip, index) => (
            <li
              key={index}
              className='flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300'
            >
              <span className='flex-shrink-0 w-5 h-5 bg-primary-800/10 dark:bg-purple-600/20 text-primary-800 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-medium'>
                {index + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <Modal modalRef={modalRef} toggleModal={toggleModal} user={userId} />
      )}
    </div>
  );
}

export default EmptyState;

