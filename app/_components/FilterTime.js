'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterBtn from './FilterBtn';

function FilterTime() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('filterTime') ?? 'month';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('filterTime', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex space-x-2 p-2'>
        <FilterBtn
          filter='month'
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Last month
        </FilterBtn>
        <FilterBtn
          filter='3month'
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Last 3 month
        </FilterBtn>
        <FilterBtn
          filter='6month'
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Last 6 month
        </FilterBtn>
        <FilterBtn
          filter='year'
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Last year
        </FilterBtn>
      </div>
    </div>
  );
}

export default FilterTime;
