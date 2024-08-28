import { CiMoneyCheck1 } from 'react-icons/ci';
import { FaCar } from 'react-icons/fa';
import { GiMoneyStack, GiPartyPopper } from 'react-icons/gi';
import { MdFastfood, MdRestaurant } from 'react-icons/md';
import { TbArrowsTransferDown } from 'react-icons/tb';

function Transaction({ category, amount, type }) {
  let bgColor;
  let iconCat;
  let borderColor;

  if (type === 'income') {
    borderColor = 'inner-border-green';
  } else {
    borderColor = 'inner-border-red';
  }

  switch (category) {
    case 'current expenses':
      iconCat = <CiMoneyCheck1 />;
      bgColor = 'bg-red-300 text-red-800';
      break;
    case 'car':
      iconCat = <FaCar />;
      bgColor = 'bg-blue-300 text-blue-800';
      break;
    case 'restaurants':
      iconCat = <MdRestaurant />;
      bgColor = 'bg-orange-300 text-orange-800';
      break;
    case 'nightout':
      iconCat = <GiPartyPopper />;
      bgColor = 'bg-purple-300 text-primary-800';
      break;
    case 'supermarket':
      iconCat = <MdFastfood />;
      bgColor = 'bg-yellow-300 text-yellow-800';
      break;
    case 'salary':
      iconCat = <GiMoneyStack />;
      bgColor = 'bg-green-300 text-green-800';
      break;
    case 'transfers':
      iconCat = <TbArrowsTransferDown />;
      bgColor = 'bg-pink-300 text-pink-800';
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
        {' '}
        <div
          className={`${bgColor} text-${iconCat} text-2xl rounded-full p-2 m-1`}
        >
          {iconCat}
        </div>
        <h1 className='text-xl font-semibold  ml-1'>{category}</h1>
      </div>
      <h1
        className={`text-2xl mt-1.5 font-semibold ${
          type === 'income' ? 'text-green-700' : ' text-red-700'
        }`}
      >
        {type === 'income'
          ? amount.toLocaleString('en-US')
          : '-' + amount.toLocaleString('en-US')}
        &#8362;
      </h1>
    </div>
  );
}

export default Transaction;
