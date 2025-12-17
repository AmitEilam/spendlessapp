import { startOfMonth, subMonths } from 'date-fns';
import { getTransactionsByUser } from '../_lib/data-service';
import MessageToUser from './MessageToUser';
import Transaction from './Transaction';

const TIME_FILTER_MONTHS = {
  lastMonth: 0,
  last3Months: 3,
  last6Months: 6,
  lastYear: 12,
};

async function TransactionsList({ filter, user, timeFilter }) {
  const transactions = await getTransactionsByUser(user);
  if (!transactions.length) return null;

  const now = new Date();

  // Calculate the cutoff date once based on timeFilter
  let cutoffDate;
  if (timeFilter === 'lastMonth') {
    cutoffDate = startOfMonth(now);
  } else if (TIME_FILTER_MONTHS[timeFilter] !== undefined) {
    cutoffDate = subMonths(now, TIME_FILTER_MONTHS[timeFilter]);
  }

  // Apply both filters in a single pass
  const filteredTransactions = transactions.filter((trans) => {
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
          There is no {filter} transactions yet{' '}
          {filter === 'income' ? '😥' : '😎'}
        </MessageToUser>
      )}
    </div>
  );
}

export default TransactionsList;
