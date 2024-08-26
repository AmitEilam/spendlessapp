import Link from 'next/link';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { RiInformation2Line } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { auth } from '../_lib/auth';
import NavigationItem from './NavigationItem';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 sm:text-sm md:text-base lg:text-lg xl:text-xl text-sm'>
      <ul className='flex gap-7 items-center sm:gap-10 lg:gap-16'>
        {session ? (
          <>
            <NavigationItem href={'/dashboard'} name='Dashboard'>
              <AiOutlineDashboard className='m-1' />
            </NavigationItem>
            <NavigationItem href='/transactions' name='Transactions'>
              <HiArrowsUpDown className='m-1' />
            </NavigationItem>
          </>
        ) : (
          <NavigationItem href='/about' name='About'>
            <RiInformation2Line className='m-1' />
          </NavigationItem>
        )}
        <NavigationItem href='/profile'>
          {session?.user?.image ? (
            <img
              className='h-5 rounded-full m-1'
              src={session?.user?.image}
              alt={session?.user?.name}
              referrerPolicy='no-referrer'
            />
          ) : (
            <CgProfile className='m-1' />
          )}
          <span>{session?.user?.name ? session.user.name : 'Profile'}</span>
        </NavigationItem>
      </ul>
    </nav>
  );
}
