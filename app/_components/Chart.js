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
import { useTheme } from './ThemeProvider';

function Chart({ expense, income, fixedExpense, fixedIncome }) {
  const { darkMode } = useTheme();
  
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

    if (absNum >= 10000) {
      formattedNumber = (num / 1000).toFixed(1) + 'k';
    }

    return formattedNumber;
  }

  const gridColor = darkMode ? '#374151' : '#ccc';
  const textColor = darkMode ? '#e5e7eb' : '#333';

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
          <CartesianGrid strokeDasharray='3 3' stroke={gridColor} />
          <XAxis tick={{ fill: textColor }} />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : 'white',
              border: darkMode ? '1px solid #374151' : '1px solid #ccc',
              color: textColor,
            }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
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
