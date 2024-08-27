'use server';
import { signIn, signOut } from './auth';

export async function signInAction() {
  await signIn('google', { redirectTo: '/dashboard' });
}

export async function signInRegularAction(email, password) {
  await signIn('credentials', { redirectTo: '/dashboard', email, password });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
