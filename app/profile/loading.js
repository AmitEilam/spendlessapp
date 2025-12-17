import Spinner from '@/app/_components/Spinner';

export default function Loading() {
  return (
    <div className='grid items-center justify-center'>
      <Spinner />
      <p className='text-xl text-primary-800 dark:text-purple-300'>Loading profile page... 🐷</p>
    </div>
  );
}
