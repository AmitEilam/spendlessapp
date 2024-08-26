import Image from 'next/image';
import background from '@/public/background3.png';
import LogoWithoutText from '@/app/_components/LogoWithoutText';
import { auth } from './_lib/auth';
import LinkItem from './_components/LinkItem';

export default async function Home() {
  const session = await auth();

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
        {session ? (
          <>
            <LinkItem href='/dashboard' msg='Go to dashboard' />
            <LinkItem href='/transactions' msg='Go to transactions' />
          </>
        ) : (
          <>
            <LinkItem href='/' msg='Start Today' />
            <LinkItem href='/login' msg='Login' />
          </>
        )}
      </div>
    </main>
  );
}
