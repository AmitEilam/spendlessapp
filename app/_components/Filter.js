'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import FilterBtn from './FilterBtn';
import FilterTimeBtn from './FilterTimeBtn';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('filter') ?? 'all';
  const activeTimeFilter = searchParams.get('timeFilter') ?? 'lastMonth';
  const searchQuery = searchParams.get('search') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  const [showCustomDates, setShowCustomDates] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Reset custom dates on page load
  useEffect(() => {
    if (startDate || endDate || activeTimeFilter === 'custom') {
      const params = new URLSearchParams(searchParams);
      params.delete('startDate');
      params.delete('endDate');
      params.set('timeFilter', 'lastMonth');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search - only update URL after 300ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== searchQuery) {
        const params = new URLSearchParams(searchParams);
        if (searchInput) {
          params.set('search', searchInput);
        } else {
          params.delete('search');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, searchQuery, searchParams, router, pathname]);

  function updateParams(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleFilter(filter) {
    updateParams('filter', filter);
  }

  function handleTimeFilter(timeFilter) {
    if (timeFilter === 'custom') {
      setShowCustomDates(true);
    } else {
      setShowCustomDates(false);
      const params = new URLSearchParams(searchParams);
      params.set('timeFilter', timeFilter);
      params.delete('startDate');
      params.delete('endDate');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    updateParams('timeFilter', timeFilter);
  }

  function handleDateChange(key, value) {
    updateParams(key, value);
  }

  function clearSearch() {
    setSearchInput('');
  }

  function clearDates() {
    const params = new URLSearchParams(searchParams);
    params.delete('startDate');
    params.delete('endDate');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='flex flex-col w-full'>
      {/* Search Input */}
      <div className='relative p-2'>
        <input
          type='text'
          placeholder='Search transactions...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='w-full px-4 py-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-purple-400'
        />
        {searchInput && (
          <button
            onClick={clearSearch}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
          >
            ✕
          </button>
        )}
      </div>

      {/* Type Filter */}
      <div className='flex justify-between items-center'>
        <div className='flex space-x-2 p-2'>
          <FilterBtn filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>
            All
          </FilterBtn>
          <FilterBtn filter='expenses' handleFilter={handleFilter} activeFilter={activeFilter}>
            Expenses
          </FilterBtn>
          <FilterBtn filter='income' handleFilter={handleFilter} activeFilter={activeFilter}>
            Income
          </FilterBtn>
        </div>
      </div>

      {/* Time Filter */}
      <div className='flex flex-wrap items-center'>
        <div className='flex flex-wrap gap-1 p-1 md:p-2'>
          <FilterTimeBtn filter='lastMonth' handleTimeFilter={handleTimeFilter} activeTimeFilter={activeTimeFilter}>
            Month
          </FilterTimeBtn>
          <FilterTimeBtn filter='last3Month' handleTimeFilter={handleTimeFilter} activeTimeFilter={activeTimeFilter}>
            3M
          </FilterTimeBtn>
          <FilterTimeBtn filter='last6Month' handleTimeFilter={handleTimeFilter} activeTimeFilter={activeTimeFilter}>
            6M
          </FilterTimeBtn>
          <FilterTimeBtn filter='lastYear' handleTimeFilter={handleTimeFilter} activeTimeFilter={activeTimeFilter}>
            Year
          </FilterTimeBtn>
          <FilterTimeBtn filter='custom' handleTimeFilter={handleTimeFilter} activeTimeFilter={activeTimeFilter}>
            Custom
          </FilterTimeBtn>
        </div>
      </div>

      {/* Custom Date Range */}
      {showCustomDates && (
        <div className='flex flex-wrap items-center gap-2 p-2'>
          <div className='flex items-center gap-2'>
            <label className='text-xs text-gray-600 dark:text-gray-400'>From:</label>
            <input
              type='date'
              value={startDate}
              max={endDate || today}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className='px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='text-xs text-gray-600 dark:text-gray-400'>To:</label>
            <input
              type='date'
              value={endDate}
              min={startDate}
              max={today}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              className='px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            />
          </div>
          {(startDate || endDate) && (
            <button
              type='button'
              onClick={clearDates}
              className='px-3 py-1 text-xs text-gray-500 dark:text-gray-400 active:text-red-500 dark:active:text-red-400 hover:text-red-500 dark:hover:text-red-400 touch-manipulation'
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Filter;
