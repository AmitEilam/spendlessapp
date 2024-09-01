import { Suspense } from 'react';
import Filter from '../_components/Filter';
import TransactionsList from '../_components/TransactionsList';
import Spinner from '../_components/Spinner';
import { auth } from '../_lib/auth';
import AddTransaction from '../_components/AddTransaction';
import { getTransactionsByUser } from '../_lib/data-service';
import MessageToUser from '../_components/MessageToUser';

export const metadata = {
  title: 'Transactions / SpendLess',
};

export default async function Page({ searchParams }) {
  const session = await auth();
  const userId = session?.user?.id;
  const transactions = await getTransactionsByUser(userId);
  const filter = searchParams?.filter ?? 'all';
  const timeFilter = searchParams?.timeFilter ?? 'lastMonth';

  return (
    <>
      {transactions.length ? (
        <>
          <div className='mb-5 flex items-center justify-between'>
            <h1 className='text-xl font-bold'>Transactions</h1>
            <AddTransaction user={userId} />
          </div>
          <div className='flex justify-between max-w-2xl mx-auto items-center'>
            <Filter />
          </div>
          <Suspense fallback={<Spinner />} key={`${filter}-${timeFilter}`}>
            <TransactionsList
              filter={filter}
              timeFilter={timeFilter}
              user={userId}
            />
          </Suspense>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <MessageToUser>
            There is not transactions yet, please add some 🐷
          </MessageToUser>
          <AddTransaction user={userId} />
        </div>
      )}
    </>
  );
}
