'use server';
import { auth, signIn, signOut } from './auth';
import { getTransactionsByUser } from './data-service';
import { supabase } from './supabase';

export async function signInAction() {
  await signIn('google', { redirectTo: '/dashboard' });
}

export async function signInWithGitHubAction() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function signInRegularAction(email, password) {
  await signIn('credentials', { redirectTo: '/dashboard', email, password });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function deleteTransaction(id) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in!');

  const transactions = await getTransactionsByUser(session.user.id);
  const transactionsIds = transactions.map((transaction) => transaction.id);

  if (!transactionsIds.includes(id))
    throw new Error('You are not alllowed to delete this booking');

  const { error } = await supabase.from('transactions').delete().eq('id', id);

  if (error) throw new Error('Transactions could not be deleted');
}
