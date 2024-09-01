import { auth } from '../_lib/auth';
import NewAccount from '../_components/NewAccount';

export const metadata = {
  title: 'New Account / SpendLess',
};

export default async function Page() {
  const session = await auth();

  return (
    <div className='p-4'>
      <div className='mb-5'>
        <h1 className='text-2xl font-bold'>
          Welcome, {session.user?.name.split(' ')[0]}
        </h1>
      </div>
      <NewAccount user={session.user.id} />
    </div>
  );
}
