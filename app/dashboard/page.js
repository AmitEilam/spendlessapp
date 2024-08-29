import Stats from '../_components/Stats';
import Chart from '../_components/Chart';

import { auth } from '../_lib/auth';
import { getSumTransactionsByUser } from '../_lib/data-service';

export const revalidate = 0;

export const metadata = {
  title: 'Dashboard / SpendLess',
};

export default async function Page() {
  const session = await auth();
  const transactions = await getSumTransactionsByUser(session.user.id);
  let expense = '';
  let income = '';
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
  } else {
    return (
      <div className='mb-5'>
        <h2 className='text-xl font-bold'>
          Something went wrong! You don&apos;t have any transaction yet. 🧐
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className='mb-5'>
        <h1 className='text-xl font-bold'>
          Welcome, {session?.user?.name.split(' ')[0]}
        </h1>
      </div>
      <div className='flex flex-col text-center'>
        <h2 className='font-medium'>Expenses and income</h2>
        <Chart expense={expense} income={income} />
        <h2 className='font-medium text-red-800'>Expenses by Category</h2>
        {transactions?.expense ? (
          <Stats data={transactions?.expense} type='expense' />
        ) : (
          'You dont have any expenses yet 👏🏻'
        )}
        <h2 className='font-medium text-green-800 mt-10'>Income by Category</h2>
        {transactions?.income ? (
          <Stats data={transactions?.income} type='income' />
        ) : (
          'You dont have any Income yet 🤨'
        )}
      </div>
    </>
  );
}
