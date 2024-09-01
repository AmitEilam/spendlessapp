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
  LabelList,
} from 'recharts';

function Chart({ expense, income, fixedExpense, fixedIncome }) {
  const data = [
    {
      name: 'Expenses and Income',
      income: income + fixedIncome,
      expenses: -(expense + fixedExpense),
    },
  ];

  function formatNumber(num) {
    const absNum = Math.abs(num);
    let formattedNumber = num;

    if (absNum >= 1000) {
      formattedNumber = (num / 1000).toFixed(1) + 'k';
    }

    return formattedNumber;
  }

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
          <Bar dataKey='expenses' fill='#D25653'>
            <LabelList
              dataKey='expenses'
              position='center'
              fill='darkRed'
              style={{ fontSize: '12px' }}
              formatter={formatNumber}
            />
          </Bar>
          <Bar dataKey='income' fill='#80D27D'>
            <LabelList
              dataKey='income'
              position='center'
              fill='darkGreen'
              style={{ fontSize: '12px' }}
              formatter={formatNumber}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
