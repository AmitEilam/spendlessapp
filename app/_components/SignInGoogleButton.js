import { signInAction } from '../_lib/actions';

function SignInGoogleButton() {
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
