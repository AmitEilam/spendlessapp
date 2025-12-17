import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import DarkModeToggle from '@/app/_components/DarkModeToggle';

function Header() {
  return (
    <header className='border-b border-primary-800 dark:border-gray-700 border-opacity-10 dark:border-opacity-100 sm:px-8 px-3 py-4 bg-white dark:bg-gray-800 transition-colors duration-200 relative z-50'>
      <div className='flex justify-between items-center max-w-full mx-auto'>
        <div className='flex items-center gap-3'>
          <Logo />
          <DarkModeToggle />
        </div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
