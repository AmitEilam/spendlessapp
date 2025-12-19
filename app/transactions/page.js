import { Suspense } from 'react';
import Filter from '../_components/Filter';
import TransactionsList from '../_components/TransactionsList';
import Spinner from '../_components/Spinner';
import { auth } from '../_lib/auth';
import AddTransaction from '../_components/AddTransaction';
import ExportData from '../_components/ExportData';
import { getTransactionsByUser } from '../_lib/data-service';
import EmptyState from '../_components/EmptyState';

export const metadata = {
  title: 'Transactions / SpendLess',
};

export default async function Page({ searchParams }) {
  const session = await auth();
  const userId = session?.user?.id;
  const transactions = await getTransactionsByUser(userId);
  const filter = searchParams?.filter ?? 'all';
  const timeFilter = searchParams?.timeFilter ?? 'lastMonth';
  const search = searchParams?.search ?? '';
  const startDate = searchParams?.startDate ?? '';
  const endDate = searchParams?.endDate ?? '';

  return (
    <>
      {transactions.length ? (
        <>
          <div className='mb-5 flex items-center justify-between'>
            <h1 className='text-xl font-bold'>Transactions</h1>
            <div className='flex items-center gap-2'>
              <ExportData
                transactions={transactions}
                filter={filter}
                timeFilter={timeFilter}
              />
              <AddTransaction user={userId} />
            </div>
          </div>
          <div className='flex justify-between max-w-2xl mx-auto items-center'>
            <Filter />
          </div>
          <Suspense fallback={<Spinner />} key={`${filter}-${timeFilter}-${search}-${startDate}-${endDate}`}>
            <TransactionsList
              filter={filter}
              timeFilter={timeFilter}
              search={search}
              startDate={startDate}
              endDate={endDate}
              user={userId}
            />
          </Suspense>
        </>
      ) : (
        <EmptyState userId={userId} />
      )}
    </>
  );
}
