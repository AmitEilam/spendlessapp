import SignOutButton from '../_components/SignOutButton';
import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Profile / SpendLess',
};

export default async function Page() {
  const session = await auth();
  return (
    <>
      <div className='mb-5'>
        <h1 className='text-2xl font-bold'>
          Welcome, {session.user.name.split(' ')[0]}
        </h1>
      </div>
      <SignOutButton />
    </>
  );
}
