'use client';
function FilterBtn({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-3 py-1 mr-2 text-xs sm:text-base font-medium rounded-full border transition-colors ${
        filter === activeFilter
          ? 'bg-primary-800 text-white border-primary-800'
          : 'bg-white dark:bg-gray-800 text-primary-800 dark:text-purple-400 border-primary-800 dark:border-purple-400'
      }`}
    >
      {children}
    </button>
  );
}

export default FilterBtn;
