'use client';

import { useState, useEffect } from 'react';
import { signInAction } from '../_lib/actions';

function isInAppBrowser() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  // Detect common in-app browsers
  return /FBAN|FBAV|Instagram|LinkedIn|Twitter|Line|Snapchat|Pinterest|TikTok/i.test(ua);
}

function SignInGoogleButton() {
  const [inAppBrowser, setInAppBrowser] = useState(false);

  useEffect(() => {
    setInAppBrowser(isInAppBrowser());
  }, []);

  const openInSystemBrowser = () => {
    const url = window.location.href;
    // Try to open in system browser
    // For iOS, use a custom scheme or fallback
    window.open(url, '_system') || window.open(url, '_blank');
  };

  if (inAppBrowser) {
    return (
      <div className='flex flex-col items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl max-w-[300px]'>
        <p className='text-sm text-amber-800 dark:text-amber-200 text-center'>
          Google Sign-In is not supported in this browser. Please open in Safari or Chrome.
        </p>
        <button
          onClick={openInSystemBrowser}
          className='flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-primary-800 text-white hover:bg-primary-700 transition-colors'
        >
          Open in Browser
        </button>
      </div>
    );
  }

  return (
    <form action={signInAction}>
      <button className='flex items-center min-w-[280px] sm:text-lg text-sm border border-primary-300 dark:border-gray-600 px-6 py-4 font-medium rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          className='h-6 w-6'
        />
        <span className='flex-1 text-center'>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInGoogleButton;
