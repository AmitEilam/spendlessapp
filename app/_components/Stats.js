import Stat from './Stat';

function Stats({ data, fixed, type, transactions = [] }) {
  if ((!data && !fixed) || !type) return null;

  const dataEntries = data ? Object.entries(data) : [];
  const fixedEntries = fixed ? Object.entries(fixed) : [];

  return (
    <div className='flex flex-wrap justify-center'>
      {dataEntries.map(([category, price]) =>
        price > 0 ? (
          <Stat
            key={`data-${category}`}
            value={price}
            type={type}
            category={category}
            transactions={transactions}
          />
        ) : null
      )}
      {fixedEntries.map(([category, price]) =>
        price > 0 ? (
          <Stat
            key={`fixed-${category}`}
            value={price}
            type={type}
            category={category}
            transactions={[]}
            isFixed={true}
          />
        ) : null
      )}
    </div>
  );
}

export default Stats;
