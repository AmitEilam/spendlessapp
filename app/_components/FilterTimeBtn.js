'use client';
function FilterTimeBtn({
  filter,
  handleTimeFilter,
  activeTimeFilter,
  children,
}) {
  return (
    <button
      onClick={() => handleTimeFilter(filter)}
      className={`px-3 py-1 mr-1 md:mr-2 text-[9.5px] sm:text-base font-medium rounded-full border transition-colors ${
        filter === activeTimeFilter
          ? 'bg-primary-800 text-white border-primary-800'
          : 'bg-white dark:bg-gray-800 text-primary-800 dark:text-purple-300 border-primary-800 dark:border-purple-300'
      }`}
    >
      {children}
    </button>
  );
}

export default FilterTimeBtn;
