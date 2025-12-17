import Stats from '../_components/Stats';
import Chart from '../_components/Chart';
import MonthlyChart from '../_components/MonthlyChart';
import { auth } from '../_lib/auth';
import {
  getSumFixedByUser,
  getSumTransactionsByUser,
  getMonthlyTrendsByUser,
  getCurrentMonthTransactions,
} from '../_lib/data-service';
import { redirect } from 'next/navigation';
import MessageToUser from '../_components/MessageToUser';

export const revalidate = 0;

export const metadata = {
  title: 'Dashboard / SpendLess',
};

// Helper to sum object values
const sumValues = (obj) =>
  obj ? Object.values(obj).reduce((acc, curr) => acc + curr, 0) : 0;

export default async function Page() {
  const session = await auth();
  const transactionsSummary = await getSumTransactionsByUser(session.user.id);
  const rawTransactions = await getCurrentMonthTransactions(session.user.id);
  const fixed = await getSumFixedByUser(session.user.id);
  const monthlyTrends = await getMonthlyTrendsByUser(session.user.id);

  // Redirect if user has no fixed data (new account)
  if (!fixed?.expense && !fixed?.income) {
    redirect('/newAccount');
  }

  const expense = sumValues(transactionsSummary?.expense);
  const income = sumValues(transactionsSummary?.income);
  const fixedExpense = sumValues(fixed?.expense);
  const fixedIncome = sumValues(fixed?.income);

  return (
    <>
      <div className='mb-5'>
        <h1 className='text-xl font-bold'>
          Welcome, {session?.user?.name.split(' ')[0]}
        </h1>
      </div>
      <div className='flex flex-col text-center'>
        <h2 className='font-medium'>Expenses and income this month</h2>
        <Chart
          expense={expense}
          income={income}
          fixedExpense={fixedExpense}
          fixedIncome={fixedIncome}
        />
        <h2 className='font-medium text-red-800'>
          Expenses this month by Category
        </h2>
        {transactionsSummary?.expense || fixed?.expense ? (
          <Stats
            data={transactionsSummary?.expense}
            fixed={fixed?.expense}
            type='expense'
            transactions={rawTransactions}
          />
        ) : (
          <MessageToUser>You don&apos;t have any expenses yet 👏🏻</MessageToUser>
        )}
        <h2 className='font-medium text-green-800 mt-10'>
          Income this month by Category
        </h2>
        {transactionsSummary?.income || fixed?.income ? (
          <Stats
            data={transactionsSummary?.income}
            fixed={fixed?.income}
            type='income'
            transactions={rawTransactions}
          />
        ) : (
          <MessageToUser>You don&apos;t have any income yet 🤨</MessageToUser>
        )}
        <h2 className='font-medium mt-10'>Spending Trends (Last 6 Months)</h2>
        <MonthlyChart data={monthlyTrends} />
      </div>
    </>
  );
}
