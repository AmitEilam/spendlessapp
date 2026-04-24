'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { RiInformation2Line } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { GoSignOut } from 'react-icons/go';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import { signOutAction } from '../_lib/actions';

function MobileMenu({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href) => pathname === href;

  const linkClasses = (href) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
      isActive(href)
        ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
        aria-label='Open menu'
      >
        <HiOutlineMenuAlt3 size={24} />
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/40 z-[60] transition-opacity'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700'>
          {session?.user ? (
            <div className='flex items-center gap-3'>
              {session.user.image ? (
                <Image
                  className='rounded-full'
                  src={session.user.image}
                  alt={session.user.name || 'Profile'}
                  width={36}
                  height={36}
                  referrerPolicy='no-referrer'
                />
              ) : (
                <CgProfile size={36} className='text-gray-400' />
              )}
              <span className='font-semibold text-sm text-gray-800 dark:text-gray-100 truncate max-w-[140px]'>
                {session.user.name || 'Profile'}
              </span>
            </div>
          ) : (
            <span className='font-semibold text-gray-800 dark:text-gray-100'>
              Menu
            </span>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className='p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
            aria-label='Close menu'
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <nav className='flex flex-col px-3 py-4 gap-1'>
          {session ? (
            <>
              <Link href='/dashboard' className={linkClasses('/dashboard')}>
                <AiOutlineDashboard size={20} />
                Dashboard
              </Link>
              <Link
                href='/transactions'
                className={linkClasses('/transactions')}
              >
                <HiArrowsUpDown size={20} />
                Transactions
              </Link>
            </>
          ) : (
            <Link href='/about' className={linkClasses('/about')}>
              <RiInformation2Line size={20} />
              About
            </Link>
          )}

          <Link href='/profile' className={linkClasses('/profile')}>
            <CgProfile size={20} />
            Profile
          </Link>

          {session && (
            <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
              <form action={signOutAction}>
                <button className='flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full'>
                  <GoSignOut size={20} />
                  Sign out
                </button>
              </form>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default MobileMenu;
