import Link from 'next/link';

function LinkItem({ href, msg }) {
  return (
    <Link
      href={href}
      className='bg-primary-800 dark:bg-purple-600 px-5 py-3 m-3 text-white text-lg font-semibold transition-all rounded-full hover:bg-primary-700 dark:hover:bg-purple-500'
    >
      {msg}
    </Link>
  );
}

export default LinkItem;
