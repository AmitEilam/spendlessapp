import Link from 'next/link';

function LinkItem({ href, msg }) {
  return (
    <Link
      href={href}
      className='bg-primary-800 px-5 py-3 m-3 text-white text-lg font-semibold transition-all rounded-full'
    >
      {msg}
    </Link>
  );
}

export default LinkItem;
