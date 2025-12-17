import Link from 'next/link';

function LinkItemSignUp({ href, msg }) {
  return (
    <Link href={href}>
      <button className='flex items-center min-w-[280px] sm:text-lg text-sm border border-primary-300 px-6 py-4 font-medium rounded-full hover:bg-gray-50 transition-colors'>
        <img src='/icon.png' alt='SpendLess logo' className='h-6 w-6' />
        <span className='flex-1 text-center'>{msg}</span>
      </button>
    </Link>
  );
}

export default LinkItemSignUp;
