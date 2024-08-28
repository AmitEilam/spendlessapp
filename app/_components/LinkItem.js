import Link from 'next/link';

function LinkItem({ href, msg }) {
  return (
    <Link
      href={href}
      className='bg-purple-800 px-6 py-4 mr-8 mb-5 text-white text-lg font-semibold transition-all rounded-full'
    >
      {msg}
    </Link>
  );
}

export default LinkItem;
