import { notFound } from 'next/navigation';
import NotFound from '../not-found';
import { supabase } from './supabase';
import { endOfMonth, startOfMonth } from 'date-fns';

// SELECT --------------------------------------------------------------------------------
export async function getTransactions() {
  const { data, error } = await supabase.from('transactions').select('*');

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getSumTransactionsByUser(id) {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now).toISOString();
  const endOfCurrentMonth = endOfMonth(now).toISOString();
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id)
    .gte('created_at', startOfCurrentMonth)
    .lte('created_at', endOfCurrentMonth);

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
export async function getSumFixedByUser(id) {
  const { data, error } = await supabase
    .from('fixed')
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

export async function getUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

// CREATE --------------------------------------------------------------------------------
export async function createUser(newGuest) {
  const { data, error } = await supabase.from('users').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('User could not be created');
  }

  return data;
}

export async function createTransaction(userId, type, category, price, notes) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ userId, type, category, price, notes }]);

  if (error) {
    console.error(error);
    throw new Error('Transaction could not be created');
  }

  return data;
}

export async function createFixed(userId, type, category, price, notes) {
  const { data, error } = await supabase
    .from('fixed')
    .insert([{ userId, type, category, price, notes }]);

  if (error) {
    console.error(error);
    throw new Error('Fixed could not be created');
  }

  return data;
}

// UPDATE --------------------------------------------------------------------------------

export async function updateFixed(userId, category, newPrice) {
  const { data, error } = await supabase
    .from('fixed')
    .update({ price: newPrice })
    .eq('userId', userId)
    .eq('category', category);

  if (error) {
    console.error(error);
    throw new Error('updated failed');
  }

  return data;
}

export async function updateUser(
  userId,
  newEmail,
  newPassword,
  newFirstName,
  newLastName
) {
  const { data, error } = await supabase
    .from('users')
    .update({
      email: newEmail,
      password: newPassword,
      firstName: newFirstName,
      lastName: newLastName,
    })
    .eq('id', userId);

  if (error) {
    console.error(error);
    throw new Error('updated failed');
  }

  return data;
}
