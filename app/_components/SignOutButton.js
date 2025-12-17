import { signOutAction } from '../_lib/actions';
import { GoSignOut } from 'react-icons/go';

function SignOutButton() {
  return (
    <form action={signOutAction} className='pt-1.5 -ml-7'>
      <button>
        <GoSignOut className='text-primary-800 dark:text-purple-300' />
      </button>
    </form>
  );
}

export default SignOutButton;
