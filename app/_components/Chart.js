'use client';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTheme } from './ThemeProvider';
import { FaArrowDown, FaArrowUp, FaWallet } from 'react-icons/fa';

function Chart({ expense, income, fixedExpense, fixedIncome }) {
  const { darkMode } = useTheme();
  
  const totalIncome = income + fixedIncome;
  const totalExpenses = expense + fixedExpense;
  const balance = totalIncome - totalExpenses;
  const isPositive = balance >= 0;
  const total = totalIncome + totalExpenses;
  
  // Only show data if there's at least one value
  // Keep Income first, Expenses second for consistent color mapping
  const data = total > 0 ? [
    {
      name: 'Income',
      value: totalIncome,
    },
    {
      name: 'Expenses',
      value: totalExpenses,
    },
  ].filter(item => item.value > 0) : [];

  // Color mapping based on name, not index
  const getColor = (name) => {
    if (name === 'Income') {
      return darkMode ? '#4ade80' : '#80D27D'; // Green for Income
    }
    return darkMode ? '#f87171' : '#D25653'; // Red for Expenses
  };

  function formatTooltip(value) {
    return value.toLocaleString('en-US') + '₪';
  }

  const textColor = darkMode ? '#e5e7eb' : '#333';
  const labelColor = darkMode ? '#f3f4f6' : '#1f2937';

  // Don't render chart if no data
  if (data.length === 0) {
    return (
      <div className='flex flex-col md:flex-row gap-6 mb-12 mt-3 items-center md:items-start justify-center'>
        <div className='text-center text-gray-500 dark:text-gray-400'>
          No data to display
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row gap-6 mb-12 mt-3 items-center md:items-start justify-center'>
      {/* Pie Chart - Second on mobile, first on desktop */}
      <div className='flex-shrink-0 order-2 md:order-1'>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={{
                stroke: darkMode ? '#9ca3af' : '#6b7280',
                strokeWidth: 1,
              }}
              label={({ percent }) => {
                if (percent < 0.05) return null; // Don't show label if segment is too small
                return `${(percent * 100).toFixed(1)}%`;
              }}
              labelStyle={{
                fill: labelColor,
                fontSize: 14,
                fontWeight: 600,
              }}
              outerRadius={100}
              innerRadius={40}
              dataKey='value'
              stroke={darkMode ? '#374151' : '#fff'}
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(entry.name)}
                  stroke={darkMode ? '#374151' : '#fff'}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        backgroundColor: darkMode ? '#1f2937' : 'white',
                        border: darkMode ? '1px solid #4b5563' : '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <p style={{ color: textColor, fontWeight: 'bold', margin: '0 0 5px 0' }}>
                        {payload[0].name} :
                      </p>
                      <p style={{ color: textColor, margin: 0 }}>
                        {formatTooltip(payload[0].value)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              wrapperStyle={{ color: textColor }}
              iconType='circle'
              formatter={(value) => (
                <span style={{ color: textColor }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Balance Summary Grid - First on mobile, second on desktop */}
      <div className='grid grid-cols-1 md:grid-cols-1 gap-4 max-w-sm w-full order-1 md:order-2'>
        {/* Income Card */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                Total Income
              </p>
              <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
                {totalIncome.toLocaleString('en-US')}₪
              </p>
            </div>
            <div className='bg-green-100 dark:bg-green-900/30 p-3 rounded-full'>
              <FaArrowUp className='text-green-600 dark:text-green-400 text-xl' />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                Total Expenses
              </p>
              <p className='text-2xl font-bold text-red-600 dark:text-red-400'>
                -{totalExpenses.toLocaleString('en-US')}₪
              </p>
            </div>
            <div className='bg-red-100 dark:bg-red-900/30 p-3 rounded-full'>
              <FaArrowDown className='text-red-600 dark:text-red-400 text-xl' />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div
          className={`rounded-xl p-5 shadow-md border transition-transform hover:scale-[1.02] ${
            isPositive
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 border-green-200 dark:border-green-800'
              : 'bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/30 border-red-200 dark:border-red-800'
          }`}
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                Net Balance
              </p>
              <p
                className={`text-2xl font-bold ${
                  isPositive
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                {isPositive ? '+' : ''}
                {balance.toLocaleString('en-US')}₪
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                isPositive
                  ? 'bg-green-200 dark:bg-green-800/50'
                  : 'bg-red-200 dark:bg-red-800/50'
              }`}
            >
              <FaWallet
                className={`text-xl ${
                  isPositive
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
