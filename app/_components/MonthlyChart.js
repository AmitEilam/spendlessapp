'use client';
import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from './ThemeProvider';

function MonthlyChart({ data }) {
  const { darkMode } = useTheme();

  if (!data || data.length === 0) return null;

  // Keep data as positive values for line chart
  const chartData = data.map((item) => ({
    ...item,
  }));

  function formatNumber(num) {
    if (num >= 10000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString('en-US');
  }

  function formatTooltip(value) {
    return value.toLocaleString('en-US') + '₪';
  }

  const gridColor = darkMode ? '#374151' : '#e5e7eb';
  const textColor = darkMode ? '#e5e7eb' : '#333';

  return (
    <div className='mb-12 mt-3'>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke={gridColor} />
          <XAxis 
            dataKey='month' 
            tick={{ fontSize: 12, fill: textColor }}
            axisLine={{ stroke: gridColor }}
          />
          <YAxis 
            tickFormatter={formatNumber} 
            tick={{ fill: textColor }}
            axisLine={{ stroke: gridColor }}
          />
          <Tooltip
            formatter={formatTooltip}
            labelStyle={{ color: darkMode ? '#fff' : '#333', fontWeight: 'bold' }}
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : 'white',
              border: darkMode ? '1px solid #374151' : '1px solid #ddd',
              borderRadius: '8px',
              color: textColor,
            }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
          <Line
            type='monotone'
            dataKey='income'
            name='Income'
            stroke='#22c55e'
            strokeWidth={3}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#16a34a' }}
          />
          <Line
            type='monotone'
            dataKey='expenses'
            name='Expenses'
            stroke='#ef4444'
            strokeWidth={3}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#dc2626' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;

