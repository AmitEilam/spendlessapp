function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

// Transaction card skeleton
export function TransactionSkeleton() {
  return (
    <div className='flex justify-between bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 max-w-2xl mx-auto my-4 border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center'>
        <Skeleton className='w-8 h-8 rounded-full mr-2' />
        <Skeleton className='w-10 h-10 rounded-full mr-2' />
        <div>
          <Skeleton className='w-24 h-5 mb-2' />
          <Skeleton className='w-32 h-3' />
        </div>
      </div>
      <Skeleton className='w-20 h-8 self-center' />
    </div>
  );
}

// Balance card skeleton for dashboard
export function BalanceSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700'
        >
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <Skeleton className='w-24 h-4 mb-2' />
              <Skeleton className='w-32 h-7' />
            </div>
            <Skeleton className='w-12 h-12 rounded-full' />
          </div>
        </div>
      ))}
    </div>
  );
}

// Chart skeleton for dashboard
export function ChartSkeleton() {
  return (
    <div className='flex justify-center mb-12 mt-3'>
      <div className='w-[70%] h-[300px] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4'>
        <div className='flex items-end justify-center gap-8 h-full'>
          <Skeleton className='w-16 h-[60%]' />
          <Skeleton className='w-16 h-[80%]' />
        </div>
      </div>
    </div>
  );
}

// Stats skeleton for dashboard
export function StatsSkeleton({ count = 4 }) {
  return (
    <div className='flex flex-wrap justify-center'>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 m-6 w-[230px] my-4 border border-gray-200 dark:border-gray-700'
        >
          <div className='flex items-center justify-center mb-3'>
            <Skeleton className='w-10 h-10 rounded-full mr-2' />
            <Skeleton className='w-24 h-5' />
          </div>
          <Skeleton className='w-28 h-7 mx-auto' />
        </div>
      ))}
    </div>
  );
}

// Filter skeleton
export function FilterSkeleton() {
  return (
    <div className='flex flex-col mb-4'>
      <div className='flex space-x-2 p-2'>
        <Skeleton className='w-16 h-8 rounded-md' />
        <Skeleton className='w-20 h-8 rounded-md' />
        <Skeleton className='w-16 h-8 rounded-md' />
      </div>
      <div className='flex space-x-2 p-2'>
        <Skeleton className='w-24 h-6 rounded-md' />
        <Skeleton className='w-28 h-6 rounded-md' />
        <Skeleton className='w-28 h-6 rounded-md' />
        <Skeleton className='w-24 h-6 rounded-md' />
      </div>
    </div>
  );
}

export default Skeleton;

