'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterBtn from './FilterBtn';
import FilterTimeBtn from './FilterTimeBtn';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('filter') ?? 'all';
  const activeTimeFilter = searchParams.get('timeFilter') ?? 'lastMonth';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function handleTimeFilter(timeFilter) {
    const params = new URLSearchParams(searchParams);
    params.set('timeFilter', timeFilter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='flex flex-col'>
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
      <div className='flex justify-between items-center'>
        <div className='flex space-x-1 md:space-x-2 p-1 md:p-2'>
          <FilterTimeBtn
            filter='lastMonth'
            handleTimeFilter={handleTimeFilter}
            activeTimeFilter={activeTimeFilter}
          >
            Last Month
          </FilterTimeBtn>
          <FilterTimeBtn
            filter='last3Month'
            handleTimeFilter={handleTimeFilter}
            activeTimeFilter={activeTimeFilter}
          >
            Last 3 Month
          </FilterTimeBtn>
          <FilterTimeBtn
            filter='last6Month'
            handleTimeFilter={handleTimeFilter}
            activeTimeFilter={activeTimeFilter}
          >
            Last 6 Month
          </FilterTimeBtn>
          <FilterTimeBtn
            filter='lastYear'
            handleTimeFilter={handleTimeFilter}
            activeTimeFilter={activeTimeFilter}
          >
            Last year
          </FilterTimeBtn>
        </div>
      </div>
    </div>
  );
}

export default Filter;
