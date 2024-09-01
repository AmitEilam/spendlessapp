import Stats from '../_components/Stats';
import Chart from '../_components/Chart';

import { auth } from '../_lib/auth';
import {
  getSumFixedByUser,
  getSumTransactionsByUser,
} from '../_lib/data-service';
import { redirect } from 'next/navigation';
import MessageToUser from '../_components/MessageToUser';

export const revalidate = 0;

export const metadata = {
  title: 'Dashboard / SpendLess',
};

export default async function Page() {
  const session = await auth();
  const transactions = await getSumTransactionsByUser(session.user.id);
  const fixed = await getSumFixedByUser(session.user.id);
  let expense = '';
  let income = '';
  let fixedExpense = '';
  let fixedIncome = '';

  if (fixed?.expense)
    fixedExpense = Object?.values(fixed?.expense).reduce(
      (acc, curr) => acc + curr,
      0
    );

  if (fixed?.income)
    fixedIncome = Object?.values(fixed?.income).reduce(
      (acc, curr) => acc + curr,
      0
    );

  if (transactions?.expense && transactions?.income) {
    expense = Object?.values(transactions?.expense).reduce(
      (acc, curr) => acc + curr,
      0
    );
    income = Object?.values(transactions?.income).reduce(
      (acc, curr) => acc + curr,
      0
    );
  } else if (transactions?.expense && !transactions?.income) {
    expense = Object?.values(transactions?.expense).reduce(
      (acc, curr) => acc + curr,
      0
    );
  } else if (transactions?.income && !transactions?.expense) {
    income = Object?.values(transactions?.income).reduce(
      (acc, curr) => acc + curr,
      0
    );
  } else if (!fixed?.expense && !fixed?.income) {
    redirect('/newAccount');
  }

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
        {transactions?.expense || fixed?.expense ? (
          <Stats
            data={transactions?.expense}
            fixed={fixed?.expense}
            type='expense'
          />
        ) : (
          <MessageToUser>You dont have any expenses yet 👏🏻</MessageToUser>
        )}
        <h2 className='font-medium text-green-800 mt-10'>
          Income this month by Category
        </h2>
        {transactions?.income || fixed?.income ? (
          <Stats
            data={transactions?.income}
            fixed={fixed?.income}
            type='income'
          />
        ) : (
          <MessageToUser>You dont have any Income yet 🤨</MessageToUser>
        )}
      </div>
    </>
  );
}
