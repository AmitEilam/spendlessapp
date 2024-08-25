import Spinner from '@/app/_components/Spinner';

export default function Loading() {
  return (
    <div className='grid items-center justify-center'>
      <Spinner />
      <p className='text-xl text-purple-800'>Loading transaction page... 🐷</p>
    </div>
  );
}
