import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='z-10 sm:text-sm md:text-base lg:text-lg xl:text-xl text-sm'>
      <ul className='flex gap-7 items-center sm:gap-10 lg:gap-16'>
        <li>
          <Link
            className={`font-medium hover:text-purple-500 transition-colors ${
              pathname === '/dashboard' ? 'text-purple-600' : 'text-purple-800'
            }`}
            href='/dashboard'
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`font-medium hover:text-purple-500 transition-colors ${
              pathname === '/NewTransaction'
                ? 'text-purple-600'
                : 'text-purple-800'
            }`}
            href='/NewTransaction'
          >
            New Transaction
          </Link>
        </li>
        <li>
          <Link
            className={`text-purple-800 font-medium hover:text-purple-500 transition-colors ${
              pathname === '/about' ? 'text-purple-600' : 'text-purple-800'
            }`}
            href='/about'
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
