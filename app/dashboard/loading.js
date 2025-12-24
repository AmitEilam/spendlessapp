import {
  ChartSkeleton,
  StatsSkeleton,
} from '@/app/_components/Skeleton';
import Skeleton from '@/app/_components/Skeleton';

export default function Loading() {
  return (
    <>
      {/* Welcome skeleton */}
      <div className='mb-5'>
        <Skeleton className='w-48 h-7' />
      </div>

      <div className='flex flex-col text-center'>
        {/* Chart title */}
        <Skeleton className='w-64 h-5 mx-auto mb-2' />

        {/* Chart skeleton (includes pie chart + summary cards) */}
        <ChartSkeleton />

        {/* Expenses section */}
        <Skeleton className='w-56 h-5 mx-auto mb-4' />
        <StatsSkeleton count={3} />

        {/* Income section */}
        <Skeleton className='w-48 h-5 mx-auto mt-10 mb-4' />
        <StatsSkeleton count={2} />

        {/* Monthly trends */}
        <Skeleton className='w-56 h-5 mx-auto mt-10 mb-4' />
        <div className='mb-12 mt-3'>
          <div className='w-full h-[300px] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4'>
            <div className='flex items-end justify-between h-full px-8'>
              {[40, 60, 45, 70, 55, 80].map((height, i) => (
                <div key={i} className='flex flex-col items-center gap-2'>
                  <Skeleton className={`w-3 rounded`} style={{ height: `${height}%` }} />
                  <Skeleton className='w-8 h-3' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
