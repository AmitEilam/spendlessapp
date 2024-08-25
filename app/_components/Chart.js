'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function Chart({ expense, income }) {
  const data = [
    {
      name: 'Expenses and Income',
      income: income,
      expenses: -expense,
    },
  ];

  return (
    <div className='flex flex-wrap justify-center mb-12 mt-3'>
      <ResponsiveContainer width='70%' height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='expenses' fill='#D25653' />
          <Bar dataKey='income' fill='#80D27D' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
