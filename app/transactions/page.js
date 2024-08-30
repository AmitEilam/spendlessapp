import { Suspense } from 'react';
import Filter from '../_components/Filter';
import TransactionsList from '../_components/TransactionsList';
import Spinner from '../_components/Spinner';
import { auth } from '../_lib/auth';
import AddTransaction from '../_components/AddTransaction';
import { getTransactionsByUser } from '../_lib/data-service';
import Msg from '../_components/msg';

export const metadata = {
  title: 'Transactions / SpendLess',
};

export default async function Page({ searchParams }) {
  const session = await auth();
  const userId = session?.user?.id;
  const transactions = await getTransactionsByUser(userId);
  const filter = searchParams?.filter ?? 'all';

  return (
    <>
      {transactions.length ? (
        <>
          <div className='mb-5'>
            <h1 className='text-2xl font-bold'>Transactions</h1>
          </div>
          <div className='flex justify-between max-w-2xl mx-auto items-center'>
            <Filter />
            <AddTransaction user={userId} />
          </div>
          <Suspense fallback={<Spinner />} key={filter}>
            <TransactionsList filter={filter} user={userId} />
          </Suspense>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <Msg>There is not transactions yet, please add some 🐷</Msg>
          <AddTransaction user={userId} />
        </div>
      )}
    </>
  );
}
