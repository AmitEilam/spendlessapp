import EditProfile from '../_components/EditProfile';
import { auth } from '../_lib/auth';
import { getSumFixedByUser, getUserById } from '../_lib/data-service';

export const revalidate = 0;

export const metadata = {
  title: 'Profile / SpendLess',
};

export default async function Page() {
  const session = await auth();
  const fixed = await getSumFixedByUser(session.user.id);
  const user = await getUserById(session.user.id);
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const email = user?.email;
  const password = user?.password;
  const salary = fixed?.income?.salary;
  const rent = fixed?.expense?.rent;
  const currentExpenses = fixed?.expense?.currentExpenses;

  return (
    <>
      <div className='mb-5'>
        <h1 className='text-xl font-bold'>
          Hi, {session.user?.name.split(' ')[0]}
        </h1>
      </div>
      <EditProfile
        user={session.user.id}
        salaryDb={salary}
        rentDb={rent}
        currentExpensesDb={currentExpenses}
        firstNameDb={firstName}
        lastNameDb={lastName}
        emailDb={email}
        passwordDb={password}
      />
    </>
  );
}
