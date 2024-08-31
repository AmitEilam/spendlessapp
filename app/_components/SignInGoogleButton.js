import { signInAction } from '../_lib/actions';

function SignInGoogleButton() {
  return (
    <form action={signInAction}>
      <button className='flex items-center sm:gap-6 gap-3 sm:text-lg text-sm border border-primary-300 px-6 py-4 font-medium rounded-full'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInGoogleButton;
