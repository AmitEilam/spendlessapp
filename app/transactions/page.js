import { Suspense } from 'react';
import Filter from '../_components/Filter';
import Transactions from '../_components/Transactions';
import Spinner from '../_components/Spinner';

export const metadata = {
  title: 'Transactions / SpendLess',
};

export default async function Page({ searchParams }) {
  const filter = searchParams?.filter ?? 'all';

  return (
    <>
      <div className='mb-5'>
        <h1 className='text-2xl font-bold'>Transactions</h1>
      </div>
      <Filter />
      <Suspense fallback={<Spinner />} key={filter}>
        <Transactions filter={filter} />
      </Suspense>
    </>
  );
}
