import { Suspense } from 'react';
import Filter from '../_components/Filter';
import TransactionsList from '../_components/TransactionsList';
import Spinner from '../_components/Spinner';
import { auth } from '../_lib/auth';
import AddTransaction from '../_components/AddTransaction';

export const metadata = {
  title: 'Transactions / SpendLess',
};

export default async function Page({ searchParams }) {
  const session = await auth();
  const userId = session?.user?.id;
  const filter = searchParams?.filter ?? 'all';

  return (
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
  );
}
