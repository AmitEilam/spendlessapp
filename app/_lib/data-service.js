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
