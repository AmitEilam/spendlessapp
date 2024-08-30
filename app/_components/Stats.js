import Stat from './Stat';

function Stats({ data, fixed, type }) {
  if ((!data || !type) && !fixed) return;

  let fixedArray = '';
  if (fixed) {
    fixedArray = Object.entries(fixed);
  }

  let dataArray = '';
  if (data) {
    dataArray = Object.entries(data);
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {data
        ? dataArray.map(([category, price]) =>
            price > 0 ? (
              <Stat
                key={category + price}
                value={price}
                type={type}
                category={category}
              />
            ) : (
              ''
            )
          )
        : ''}
      {fixed
        ? fixedArray.map(([category, price]) =>
            price > 0 ? (
              <Stat
                key={category + price}
                value={price}
                type={type}
                category={category}
              />
            ) : (
              ''
            )
          )
        : ''}
    </div>
  );
}

export default Stats;
