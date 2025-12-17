'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

function Logo() {
  const { darkMode } = useTheme();

  return (
    <Link href='/' className='flex items-center gap-4 z-10'>
      <Image
        className='w-10 h-10 sm:w-12 sm:h-12'
        src={darkMode ? '/logo-dark.jpg' : '/logo.png'}
        height={60}
        width={60}
        alt='logo'
      />
    </Link>
  );
}

export default Logo;
