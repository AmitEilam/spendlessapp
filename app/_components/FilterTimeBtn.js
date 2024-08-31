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
      className={`px-3 py-1 mr-1 md:mr-2 text-[9.5px] sm:text-base font-medium rounded-full border ${
        filter === activeTimeFilter
          ? 'bg-primary-800 text-white'
          : 'bg-white text-primary-800'
      }`}
    >
      {children}
    </button>
  );
}

export default FilterTimeBtn;
