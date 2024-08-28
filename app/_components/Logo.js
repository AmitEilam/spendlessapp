import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href='/' className='flex items-center gap-4 z-10'>
      <Image
        className='w-10 h-10 sm:w-12 sm:h-12'
        src='/logo.png'
        height={60}
        width={60}
        alt='logo'
      />
    </Link>
  );
}

export default Logo;
