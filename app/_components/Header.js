import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

function Header() {
  return (
    <header className='border-b border-primary-800 border-opacity-10 sm:px-8 px-3 py-4'>
      <div className='flex justify-between items-center max-w-full mx-auto'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
