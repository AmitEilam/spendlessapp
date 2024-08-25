'use client';
import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();

  return (
    <header className='border-b border-purple-800 border-opacity-10 px-8 py-4'>
      <div className='flex justify-between items-center max-w-full mx-auto'>
        {pathname !== '/s' ? <Logo /> : <div></div>}
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
