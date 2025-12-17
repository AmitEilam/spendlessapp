import { signInWithGitHubAction } from '../_lib/actions';
import { FaGithub } from 'react-icons/fa';

function SignInGitHubButton() {
  return (
    <form action={signInWithGitHubAction}>
      <button className='flex items-center sm:gap-6 gap-3 sm:text-lg text-sm border border-primary-300 px-6 py-4 font-medium rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors'>
        <FaGithub size={24} />
        <span>Continue with GitHub</span>
      </button>
    </form>
  );
}

export default SignInGitHubButton;

