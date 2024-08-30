'use client';
import { deleteTransaction } from '../_lib/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handlerCategory } from '../_utils/categoryUtils';

function Transaction({ category, price, type, id }) {
  const router = useRouter();
  // const formattedDate = format(date, 'dd.MM.yy');
  let borderColor;

  const { title, iconCat, bgColor } = handlerCategory(category);

  function deleteHandler() {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        deleteTransaction(id);
        toast.success('Transaction successfully deleted! 🐷');
      } catch {
        toast.error('Failed to delete transaction! 💔');
      }
    }
    router.refresh();
  }

  if (type === 'income') {
    borderColor = 'inner-border-green';
  } else {
    borderColor = 'inner-border-red';
  }

  return (
    <div
      className={`flex justify-between bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto my-4 border border-gray-200 inner-border-left ${borderColor} transition-transform transform  hover:shadow-lg fade-in`}
    >
      <div className='flex items-center justify-center'>
        <button
          onClick={deleteHandler}
          className='px-2 py-1 mr-2 text-xs font-bold rounded-full border bg-white text-primary-800'
        >
          X
        </button>
        <div
          className={`${bgColor} text-${iconCat} text-2xl rounded-full p-2 m-1`}
        >
          {iconCat}
        </div>
        <h1 className='text-xl font-semibold  ml-1'>{title}</h1>
      </div>
      <h1
        className={`text-2xl mt-1.5 font-semibold ${
          type === 'income' ? 'text-green-700' : ' text-red-700'
        }`}
      >
        {type === 'income'
          ? price.toLocaleString('en-US')
          : '-' + price.toLocaleString('en-US')}
        &#8362;
      </h1>
    </div>
  );
}

export default Transaction;
