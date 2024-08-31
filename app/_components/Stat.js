import { handlerCategory } from '../_utils/categoryUtils';

function Stat({ value, type, category }) {
  const { title, iconCat, bgColor } = handlerCategory(category);
  return (
    <div className='flex flex-col bg-white shadow-md rounded-lg p-6 m-6 w-[230px] my-4 border border-gray-200 inner-border-left transition-transform transform  fade-in'>
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
