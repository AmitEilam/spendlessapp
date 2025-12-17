'use client';
import { FaArrowDown, FaArrowUp, FaWallet } from 'react-icons/fa';

function BalanceSummary({ totalIncome, totalExpenses }) {
  const balance = totalIncome - totalExpenses;
  const isPositive = balance >= 0;

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto'>
      {/* Income Card */}
      <div className='bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
              Total Income
            </p>
            <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
              {totalIncome.toLocaleString('en-US')}₪
            </p>
          </div>
          <div className='bg-green-100 dark:bg-green-900/30 p-3 rounded-full'>
            <FaArrowUp className='text-green-600 dark:text-green-400 text-xl' />
          </div>
        </div>
      </div>

      {/* Expenses Card */}
      <div className='bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
              Total Expenses
            </p>
            <p className='text-2xl font-bold text-red-600 dark:text-red-400'>
              -{totalExpenses.toLocaleString('en-US')}₪
            </p>
          </div>
          <div className='bg-red-100 dark:bg-red-900/30 p-3 rounded-full'>
            <FaArrowDown className='text-red-600 dark:text-red-400 text-xl' />
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div
        className={`rounded-xl p-5 shadow-md border transition-transform hover:scale-[1.02] ${
          isPositive
            ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 border-green-200 dark:border-green-800'
            : 'bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/30 border-red-200 dark:border-red-800'
        }`}
      >
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
              Net Balance
            </p>
            <p
              className={`text-2xl font-bold ${
                isPositive
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-red-700 dark:text-red-300'
              }`}
            >
              {isPositive ? '+' : ''}
              {balance.toLocaleString('en-US')}₪
            </p>
          </div>
          <div
            className={`p-3 rounded-full ${
              isPositive
                ? 'bg-green-200 dark:bg-green-800/50'
                : 'bg-red-200 dark:bg-red-800/50'
            }`}
          >
            <FaWallet
              className={`text-xl ${
                isPositive
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-red-700 dark:text-red-300'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSummary;

