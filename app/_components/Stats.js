import Stat from './Stat';

function Stats({ data, type }) {
  const dataArray = Object.entries(data);
  return (
    <div className='flex flex-wrap justify-center mb-12 mt-2'>
      {dataArray.map(([category, amount]) => (
        <Stat
          key={category + amount}
          title={category}
          value={amount}
          type={type}
          category={category}
        />
      ))}
    </div>
  );
}

export default Stats;
