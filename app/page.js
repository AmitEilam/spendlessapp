import Image from 'next/image';
import background from '@/public/background3.png';
import Link from 'next/link';
import LogoWithoutText from '@/app/_components/LogoWithoutText';

export default function Home() {
  return (
    <main className='mt-20'>
      <Image
        src={background}
        fill
        quality={90}
        className='relative object-cover object-bottom blur-[2px]'
        alt='home-background'
      />
      <div className='relative z-10 text-center mt-20'>
        <LogoWithoutText />
        <h1 className='text-6xl text-purple-800 mb-2 mt-1 tracking-tight font-n'>
          SpendLess
        </h1>
        <h3 className='text-md text-purple-800 mb-16 tracking-tight font-n'>
          Manage more, spend less.
        </h3>
        <Link
          href='/'
          className='bg-purple-800 px-6 py-4 mr-8 text-white text-lg font-semibold transition-all rounded-full'
        >
          Start Today
        </Link>
        <Link
          href='/'
          className='bg-purple-800 px-6 py-4 text-white text-lg font-semibold transition-all rounded-full'
        >
          Login
        </Link>
      </div>
    </main>
  );
}
