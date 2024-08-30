'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterBtn from './FilterBtn';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('filter') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex space-x-2 p-2'>
        <FilterBtn
          filter='all'
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          All
        </FilterBtn>
        <FilterBtn
          filter='expenses'
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Expenses
        </FilterBtn>
        <FilterBtn
          filter='income'
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Income
        </FilterBtn>
      </div>
    </div>
  );
}

export default Filter;
