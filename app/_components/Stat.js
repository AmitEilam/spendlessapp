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
      bgColor = 'bg-blue-300 text-blue-700';
      break;
    case 'restaurants':
      iconCat = <MdRestaurant />;
      bgColor = 'bg-orange-300 text-orange-700';
      break;
    case 'nightout':
      iconCat = <GiPartyPopper />;
      bgColor = 'bg-purple-300 text-purple-700';
      break;
    case 'supermarket':
      iconCat = <MdFastfood />;
      bgColor = 'bg-yellow-300 text-yellow-700';
      break;
    case 'salary':
      iconCat = <GiMoneyStack />;
      bgColor = 'bg-green-300 text-green-700';
      break;
    case 'transfer':
      iconCat = <TbArrowsTransferDown />;
      bgColor = 'bg-pink-300 text-pink-700';
      break;
    default:
      iconCat = 'bg-purple-300 text-purple-700';
      break;
  }

  return (
    <div className='w-40 h-50 flex flex-col items-center justify-between border p-4 text-center m-2 shadow-md'>
      <div className='flex flex-row items-center mb-4'>
        <div
          className={`${bgColor} text-${iconCat} text-2xl rounded-full p-3 m-1`}
        >
          {iconCat}
        </div>
        <div>{title}</div>
      </div>
      {type === 'expense' ? (
        <div className='font-medium text-2xl text-red-700 mt-3'>
          -{value}&#8362;
        </div>
      ) : (
        <div className='font-medium text-2xl text-green-700 mt-3'>
          {value}&#8362;
        </div>
      )}
    </div>
  );
}

export default Stat;
