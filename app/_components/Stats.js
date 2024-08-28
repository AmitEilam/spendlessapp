import Stat from './Stat';

function Stats({ data, type }) {
  const dataArray = Object.entries(data);
  return (
    <div className='flex flex-wrap justify-center'>
      {dataArray.map(([category, price]) => (
        <Stat
          key={category + price}
          title={category}
          value={price}
          type={type}
          category={category}
        />
      ))}
    </div>
  );
}

export default Stats;
