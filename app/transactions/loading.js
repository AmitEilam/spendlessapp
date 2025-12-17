import {
  TransactionSkeleton,
  FilterSkeleton,
} from '@/app/_components/Skeleton';
import Skeleton from '@/app/_components/Skeleton';

export default function Loading() {
  return (
    <>
      {/* Header skeleton */}
      <div className='mb-5 flex items-center justify-between'>
        <Skeleton className='w-32 h-7' />
        <div className='flex items-center gap-2'>
          <Skeleton className='w-20 h-8 rounded-md' />
          <Skeleton className='w-36 h-8 rounded-md' />
        </div>
      </div>

      {/* Filters skeleton */}
      <div className='flex justify-between max-w-2xl mx-auto items-center'>
        <FilterSkeleton />
      </div>

      {/* Transaction cards skeleton */}
      <div className='mt-4'>
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
      </div>
    </>
  );
}
