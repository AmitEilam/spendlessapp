import { supabase } from './supabase';

export async function getTransactions() {
  const { data, error } = await supabase.from('transactions').select('*');

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getTransactionsByUser(id) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id);

  if (error) {
    console.error(error);
    notFound();
  }

  const result = data.reduce((acc, data) => {
    const { category, type, amount } = data;

    if (!acc[type]) {
      acc[type] = {};
    }

    if (!acc[type][category]) {
      acc[type][category] = 0;
    }

    acc[type][category] += amount;

    return acc;
  }, {});

  return result;
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
