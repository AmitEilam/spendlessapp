'use client';
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { format, startOfMonth, subMonths } from 'date-fns';
import { handlerCategory } from '../_utils/categoryUtils';

const TIME_FILTER_MONTHS = {
  lastMonth: 0,
  last3Month: 3,
  last6Month: 6,
  lastYear: 12,
};

const TIME_FILTER_LABELS = {
  lastMonth: 'last-month',
  last3Month: 'last-3-months',
  last6Month: 'last-6-months',
  lastYear: 'last-year',
};

function ExportData({ transactions, filter, timeFilter }) {
  const [isExporting, setIsExporting] = useState(false);

  const getFilteredTransactions = () => {
    if (!transactions || transactions.length === 0) return [];

    const now = new Date();

    // Calculate the cutoff date based on timeFilter
    let cutoffDate;
    if (timeFilter === 'lastMonth') {
      cutoffDate = startOfMonth(now);
    } else if (TIME_FILTER_MONTHS[timeFilter] !== undefined) {
      cutoffDate = subMonths(now, TIME_FILTER_MONTHS[timeFilter]);
    }

    // Apply both filters
    return transactions.filter((trans) => {
      // Time filter
      if (cutoffDate && new Date(trans.created_at) < cutoffDate) {
        return false;
      }
      // Type filter
      if (filter === 'expenses' && trans.type !== 'expense') {
        return false;
      }
      if (filter === 'income' && trans.type !== 'income') {
        return false;
      }
      return true;
    });
  };

  const exportToCSV = () => {
    const filteredTransactions = getFilteredTransactions();
    if (filteredTransactions.length === 0) return;

    setIsExporting(true);

    try {
      // CSV headers
      const headers = ['Date', 'Type', 'Category', 'Amount (₪)', 'Notes'];

      // Format transactions for CSV
      const rows = filteredTransactions.map((t) => {
        const { title } = handlerCategory(t.category, 'transaction');
        const date = format(new Date(t.created_at), 'dd/MM/yyyy');
        const type = t.type === 'income' ? 'Income' : 'Expense';
        const amount = t.type === 'income' ? t.price : -t.price;
        const notes = t.notes ? `"${t.notes.replace(/"/g, '""')}"` : '';

        return [date, type, title, amount, notes].join(',');
      });

      // Combine headers and rows
      const csvContent = [headers.join(','), ...rows].join('\n');

      // Create filename with filter info
      const filterLabel = filter !== 'all' ? `-${filter}` : '';
      const timeLabel = TIME_FILTER_LABELS[timeFilter] || '';

      // Create blob and download
      const blob = new Blob(['\ufeff' + csvContent], {
        type: 'text/csv;charset=utf-8;',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `spendless-${timeLabel}${filterLabel}-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!transactions || transactions.length === 0) return null;

  return (
    <button
      onClick={exportToCSV}
      disabled={isExporting}
      className='flex items-center px-3 py-1 text-xs sm:text-base font-medium rounded-md border border-primary-800 dark:border-purple-300 bg-white dark:bg-gray-800 text-primary-800 dark:text-purple-300 hover:bg-primary-800 hover:text-white dark:hover:bg-purple-600 transition-colors disabled:opacity-50'
      title='Export filtered transactions to CSV'
    >
      <FiDownload className='mr-1' />
      Export
    </button>
  );
}

export default ExportData;
