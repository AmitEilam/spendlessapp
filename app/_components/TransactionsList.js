import { startOfMonth, subMonths, startOfDay, endOfDay } from 'date-fns';
import { getTransactionsByUser } from '../_lib/data-service';
import { handlerCategory } from '../_utils/categoryUtils';
import MessageToUser from './MessageToUser';
import Transaction from './Transaction';

const TIME_FILTER_MONTHS = {
  lastMonth: 0,
  last3Month: 3,
  last6Month: 6,
  lastYear: 12,
};

async function TransactionsList({ filter, user, timeFilter, search, startDate, endDate }) {
  const transactions = await getTransactionsByUser(user);
  if (!transactions.length) return null;

  const now = new Date();
  const searchLower = search?.toLowerCase() ?? '';

  // Calculate the cutoff date based on timeFilter (unless custom)
  let cutoffDate;
  let customStart;
  let customEnd;

  if (timeFilter === 'custom') {
    customStart = startDate ? startOfDay(new Date(startDate)) : null;
    customEnd = endDate ? endOfDay(new Date(endDate)) : null;
  } else if (timeFilter === 'lastMonth') {
    cutoffDate = startOfMonth(now);
  } else if (TIME_FILTER_MONTHS[timeFilter] !== undefined) {
    cutoffDate = subMonths(now, TIME_FILTER_MONTHS[timeFilter]);
  }

  // Apply all filters in a single pass
  const filteredTransactions = transactions.filter((trans) => {
    const transDate = new Date(trans.created_at);

    // Custom date range filter
    if (timeFilter === 'custom') {
      if (customStart && transDate < customStart) return false;
      if (customEnd && transDate > customEnd) return false;
    } else {
      // Standard time filter
      if (cutoffDate && transDate < cutoffDate) return false;
    }

    // Type filter
    if (filter === 'expenses' && trans.type !== 'expense') return false;
    if (filter === 'income' && trans.type !== 'income') return false;

    // Search filter
    if (searchLower) {
      const { title } = handlerCategory(trans.category, 'transaction');
      const titleMatch = title.toLowerCase().includes(searchLower);
      const notesMatch = trans.notes?.toLowerCase().includes(searchLower);
      if (!titleMatch && !notesMatch) return false;
    }

    return true;
  });

  return (
    <div>
      {filteredTransactions.length ? (
        filteredTransactions.map((e) => (
          <Transaction
            category={e?.category}
            price={e?.price}
            type={e?.type}
            id={e?.id}
            date={e?.created_at}
            notes={e?.notes}
            key={e.id}
          />
        ))
      ) : (
        <MessageToUser>
          No transactions found {search ? `matching "${search}"` : ''} 🔍
        </MessageToUser>
      )}
    </div>
  );
}

export default TransactionsList;
