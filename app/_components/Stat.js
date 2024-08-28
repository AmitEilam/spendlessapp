import {
  GiReceiveMoney,
  GiPayMoney,
  GiPartyPopper,
  GiMoneyStack,
} from 'react-icons/gi';
import { MdRestaurant, MdFastfood } from 'react-icons/md';
import { FaCar } from 'react-icons/fa';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { TbArrowsTransferDown } from 'react-icons/tb';

function Stat({ title, value, type, category }) {
  let bgColor;
  let iconCat;

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
    <div className='flex flex-col bg-white shadow-md rounded-lg p-6 m-6 w-[230px] my-4 border border-gray-200 inner-border-left transition-transform transform  hover:shadow-lg fade-in'>
      <div className='flex items-center justify-center'>
        <div
          className={`${bgColor} text-${iconCat} text-2xl rounded-full p-2 m-1`}
        >
          {iconCat}
        </div>
        <div>{title}</div>
      </div>
      {type === 'expense' ? (
        <div className='font-medium text-2xl text-red-700 mt-3'>
          -{value.toLocaleString('en-US')}&#8362;
        </div>
      ) : (
        <div className='font-medium text-2xl text-green-700 mt-3'>
          {value.toLocaleString('en-US')}&#8362;
        </div>
      )}
    </div>
  );
}

export default Stat;
