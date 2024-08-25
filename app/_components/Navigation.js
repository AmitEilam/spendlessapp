import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        <li>
          <Link
            className='text-purple-800 font-medium hover:text-purple-500 transition-colors'
            href='/dashboard'
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className='text-purple-800 font-medium hover:text-purple-500 transition-colors'
            href='/NewTransaction'
          >
            New Transaction
          </Link>
        </li>
        <li>
          <Link
            className='text-purple-800 font-medium hover:text-purple-500 transition-colors'
            href='/about'
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
