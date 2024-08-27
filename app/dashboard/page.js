import Stats from '../_components/Stats';
import Chart from '../_components/Chart';
import { getTransactionsByUser } from '../_lib/data-service';
import { auth } from '../_lib/auth';

export const revalidate = 0;

export const metadata = {
  title: 'Dashboard / SpendLess',
};

export default async function Page() {
  const session = await auth();
  const transactions = await getTransactionsByUser(session.user.id);
  let expense = 'a';
  let income = 'b';

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
          Something went wrong! You don't have any transaction yet. 🧐
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
        <h2 className='font-medium'>Expenses and income this month</h2>
        <Chart expense={expense} income={income} />
        <h2 className='font-medium text-red-800'>
          Expense categories this month
        </h2>
        <Stats data={transactions?.expense} type='expense' />
        <h2 className='font-medium text-green-800'>
          Incoming categories this month
        </h2>
        <Stats data={transactions?.income} type='income' />
      </div>
    </>
  );
}
