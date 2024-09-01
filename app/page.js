import Image from 'next/image';
import background from '@/public/background3.png';
import LogoWithoutText from '@/app/_components/LogoWithoutText';
import { auth } from './_lib/auth';
import LinkItem from './_components/LinkItem';

export default async function Home() {
  const session = await auth();

  return (
    <div className='relative flex flex-col justify-center items-center h-screen'>
      <Image
        src={background}
        fill
        quality={90}
        className='absolute inset-0 object-cover object-bottom blur-[2px]'
        alt='home-background'
      />
      <div className='relative z-10 text-center'>
        <LogoWithoutText />
        <h1 className='text-6xl text-primary-800 mb-2 mt-1 tracking-tight font-n'>
          SpendLess
        </h1>
        <h3 className='text-md text-primary-800 mb-16 tracking-tight font-n'>
          Manage more, spend less.
        </h3>
        <div className='flex flex-wrap justify-center'>
          {session ? (
            <>
              <LinkItem href='/dashboard' msg='Go to dashboard' />
              <LinkItem href='/transactions' msg='Go to transactions' />
            </>
          ) : (
            <>
              <LinkItem href='/signup' msg='Sign up' />
              <LinkItem href='/login' msg='Login' />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
