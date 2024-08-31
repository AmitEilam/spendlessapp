import Link from 'next/link';

function LinkItemSignUp({ href, msg }) {
  return (
    <Link href={href}>
      <button className='flex items-center gap-6 mt-4 sm:text-lg text-sm border border-primary-300 px-6 py-4 font-medium rounded-full'>
        <img src='../icon.png' alt='Google logo' height='24' width='24' />
        <span>{msg}</span>
      </button>
    </Link>
  );
}

export default LinkItemSignUp;
