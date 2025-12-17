import Link from 'next/link';

function LinkItemSignUp({ href, msg }) {
  return (
    <Link href={href}>
      <button className='flex items-center min-w-[280px] sm:text-lg text-sm border border-primary-300 dark:border-gray-600 px-6 py-4 font-medium rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'>
        <img src='/icon.png' alt='SpendLess logo' className='h-6 w-6' />
        <span className='flex-1 text-center'>{msg}</span>
      </button>
    </Link>
  );
}

export default LinkItemSignUp;
