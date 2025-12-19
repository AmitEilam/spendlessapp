'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Pagination({ totalPages, currentPage }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  function goToPage(page) {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='flex justify-center items-center gap-3 mt-6'>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className='w-10 h-10 flex items-center justify-center text-lg rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation'
      >
        ‹
      </button>
      <span className='text-sm text-gray-600 dark:text-gray-400'>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='w-10 h-10 flex items-center justify-center text-lg rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation'
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;

