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

function MonthlyChart({ data }) {
  if (!data || data.length === 0) return null;

  // Transform data for the chart (expenses as negative for visual comparison)
  const chartData = data.map((item) => ({
    ...item,
    expenses: -item.expenses,
  }));

  function formatNumber(num) {
    const absNum = Math.abs(num);
    if (absNum >= 10000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString('en-US');
  }

  function formatTooltip(value) {
    return Math.abs(value).toLocaleString('en-US') + '₪';
  }

  return (
    <div className='flex flex-wrap justify-center mb-12 mt-3'>
      <ResponsiveContainer width='90%' height={350}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip
            formatter={formatTooltip}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar
            dataKey='expenses'
            name='Expenses'
            fill='#D25653'
            radius={[4, 4, 0, 0]}
          >
            <LabelList
              dataKey='expenses'
              position='center'
              fill='darkRed'
              style={{ fontSize: '11px' }}
              formatter={formatNumber}
            />
          </Bar>
          <Bar
            dataKey='income'
            name='Income'
            fill='#80D27D'
            radius={[4, 4, 0, 0]}
          >
            <LabelList
              dataKey='income'
              position='center'
              fill='darkGreen'
              style={{ fontSize: '11px' }}
              formatter={formatNumber}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;

