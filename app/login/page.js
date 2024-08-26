import Login from '../_components/Login';
import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Login / SpendLess',
};

export default async function Page() {
  const session = await auth();
  if (session) return;
  return <Login />;
}
