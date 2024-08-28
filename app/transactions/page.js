import Transaction from '../_components/Transaction';
import { auth } from '../_lib/auth';
import { getTransactionsByUser } from '../_lib/data-service';

export const metadata = {
  title: 'Transactions / SpendLess',
};

export default async function Page() {
  const session = await auth();
  const incomes = await getTransactionsByUser(session.user.id);

  return (
    <>
      <div className='mb-5'>
        <h1 className='text-2xl font-bold'>Transactions</h1>
      </div>
      <div>
        {incomes.map((e) => (
          <Transaction
            category={e.category}
            amount={e.amount}
            type={e.type}
            key={e.id}
          />
        ))}
      </div>
    </>
  );
}
