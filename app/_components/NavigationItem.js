'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavigationItem({ href, name, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li>
      <Link
        className={`flex items-center font-medium transition-colors ${
          isActive
            ? 'text-purple-600 dark:text-purple-300'
            : 'text-primary-800 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-200'
        }`}
        href={href}
      >
        {children}
        {name}
      </Link>
    </li>
  );
}

export default NavigationItem;
