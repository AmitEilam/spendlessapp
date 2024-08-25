import Image from 'next/image';
import Link from 'next/link';

function LogoWithoutText() {
  return (
    <div className='flex items-center justify-center gap-4 z-10'>
      <Image src='/logoWT.png' height='200' width='200' alt='logo' />
    </div>
  );
}

export default LogoWithoutText;
