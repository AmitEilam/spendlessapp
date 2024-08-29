'use client';
function FilterBtn({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-3 py-1 mr-2 text-xs sm:text-base font-medium rounded-full border ${
        filter === activeFilter
          ? 'bg-primary-800 text-white'
          : 'bg-white text-primary-800'
      }`}
    >
      {children}
    </button>
  );
}

export default FilterBtn;
