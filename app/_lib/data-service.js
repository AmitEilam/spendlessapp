import NotFound from '../not-found';
import { supabase } from './supabase';

export async function getTransactions() {
  const { data, error } = await supabase.from('transactions').select('*');

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getSumTransactionsByUser(id) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id);

  if (error) {
    console.error(error);
    NotFound();
  }

  const result = data.reduce((acc, data) => {
    const { category, type, price } = data;

    if (!acc[type]) {
      acc[type] = {};
    }

    if (!acc[type][category]) {
      acc[type][category] = 0;
    }

    acc[type][category] += price;

    return acc;
  }, {});

  return result;
}

export async function getTransactionsByUser(id) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    NotFound();
  }

  return data;
}

export async function getTransactionsByUserAndFiler(id, filter) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id)
    .order(filter, { ascending: false });

  if (error) {
    console.error(error);
    NotFound();
  }

  return data;
}

export async function getUser(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function createUser(newGuest) {
  const { data, error } = await supabase.from('users').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}
