'use client';

import { CiMoneyCheck1 } from 'react-icons/ci';
import { FaCar, FaHome } from 'react-icons/fa';
import { GiMoneyStack, GiPartyPopper } from 'react-icons/gi';
import { MdFastfood, MdRestaurant } from 'react-icons/md';
import { TbArrowsTransferDown } from 'react-icons/tb';
import { format } from 'date-fns';
import { deleteTransaction } from '../_lib/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Transaction({ category, price, type, id }) {
  const router = useRouter();
  // const formattedDate = format(date, 'dd.MM.yy');
  let bgColor;
  let iconCat;
  let borderColor;
  let title = category;

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

  switch (category) {
    case 'currentExpenses':
      title = 'Current expenses';
      iconCat = <CiMoneyCheck1 />;
      bgColor = 'bg-red-300 text-red-800';
      break;
    case 'car':
      title = 'Car';
      iconCat = <FaCar />;
      bgColor = 'bg-blue-300 text-blue-800';
      break;
    case 'restaurant':
      title = 'Restaurant';
      iconCat = <MdRestaurant />;
      bgColor = 'bg-orange-300 text-orange-800';
      break;
    case 'nightout':
      title = 'Nightout';
      iconCat = <GiPartyPopper />;
      bgColor = 'bg-purple-300 text-primary-800';
      break;
    case 'supermarket':
      title = 'Supermarket';
      iconCat = <MdFastfood />;
      bgColor = 'bg-yellow-300 text-yellow-800';
      break;
    case 'salary':
      title = 'Salary';
      iconCat = <GiMoneyStack />;
      bgColor = 'bg-green-300 text-green-800';
      break;
    case 'transfer':
      title = 'Transfer';
      iconCat = <TbArrowsTransferDown />;
      bgColor = 'bg-pink-300 text-pink-800';
      break;
    case 'rent':
      title = 'Rent';
      iconCat = <FaHome />;
      bgColor = 'bg-cyan-300 text-cyan-800';
      break;
    default:
      iconCat = 'bg-purple-300 text-primary-800';
      break;
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
