import { notFound } from 'next/navigation';
import { supabase } from './supabase';
import { endOfMonth, startOfMonth, subMonths, format } from 'date-fns';

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
    notFound();
  }

  const result = data.reduce((acc, item) => {
    const { category, type, price } = item;

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

export async function getCurrentMonthTransactions(id) {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now).toISOString();
  const endOfCurrentMonth = endOfMonth(now).toISOString();
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id)
    .gte('created_at', startOfCurrentMonth)
    .lte('created_at', endOfCurrentMonth)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getSumFixedByUser(id) {
  const now = new Date();

  const { data, error } = await supabase
    .from('fixed')
    .select('*')
    .eq('userId', id)
    .lte('created_at', endOfMonth(now).toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  // For each category/type, only use the most recent record
  const latestByCategory = {};
  data.forEach((item) => {
    const key = `${item.type}-${item.category}`;
    // Since data is ordered by created_at desc, first occurrence is the latest
    if (!latestByCategory[key]) {
      latestByCategory[key] = item;
    }
  });

  const result = Object.values(latestByCategory).reduce((acc, item) => {
    const { category, type, price } = item;

    if (!acc[type]) {
      acc[type] = {};
    }

    acc[type][category] = price;

    return acc;
  }, {});

  return result;
}

export async function getMonthlyTrendsByUser(id) {
  const now = new Date();
  const sixMonthsAgo = startOfMonth(subMonths(now, 5));

  // Fetch transactions from the last 6 months
  const { data: transactions, error: transError } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id)
    .gte('created_at', sixMonthsAgo.toISOString())
    .order('created_at', { ascending: true });

  if (transError) {
    console.error(transError);
    notFound();
  }

  // Fetch ALL fixed expenses/income (to find applicable ones per month)
  const { data: fixed, error: fixedError } = await supabase
    .from('fixed')
    .select('*')
    .eq('userId', id)
    .order('created_at', { ascending: false });

  if (fixedError) {
    console.error(fixedError);
    notFound();
  }

  // Helper function to get fixed totals for a specific month
  // Uses the most recent fixed record created before or during that month
  const getFixedTotalsForMonth = (monthEnd) => {
    const latestByCategory = {};

    fixed.forEach((item) => {
      const itemDate = new Date(item.created_at);
      // Only consider records created before or during this month
      if (itemDate <= monthEnd) {
        const key = `${item.type}-${item.category}`;
        // Since data is ordered by created_at desc, first occurrence is the latest
        if (!latestByCategory[key]) {
          latestByCategory[key] = item;
        }
      }
    });

    return Object.values(latestByCategory).reduce(
      (acc, item) => {
        if (item.type === 'expense') {
          acc.expenses += item.price;
        } else if (item.type === 'income') {
          acc.income += item.price;
        }
        return acc;
      },
      { expenses: 0, income: 0 }
    );
  };

  // Initialize the last 6 months with their respective fixed values
  const monthlyData = {};
  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const monthKey = format(monthDate, 'yyyy-MM');
    const monthLabel = format(monthDate, 'MMM');
    const monthEnd = endOfMonth(monthDate);

    // Get fixed totals applicable to this specific month
    const fixedTotals = getFixedTotalsForMonth(monthEnd);

    monthlyData[monthKey] = {
      month: monthLabel,
      expenses: fixedTotals.expenses,
      income: fixedTotals.income,
    };
  }

  // Add transaction data to each month
  transactions.forEach((transaction) => {
    const monthKey = format(new Date(transaction.created_at), 'yyyy-MM');
    if (monthlyData[monthKey]) {
      if (transaction.type === 'expense') {
        monthlyData[monthKey].expenses += transaction.price;
      } else if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.price;
      }
    }
  });

  // Convert to array sorted by month
  return Object.values(monthlyData);
}

export async function getTransactionsByUser(id) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getTransactionsByUserAndFilter(id, filter) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('userId', id)
    .order(filter, { ascending: false });

  if (error) {
    console.error(error);
    notFound();
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
  const aa = await getUser(newGuest.email);
  if (aa) {
    throw new Error(
      'User could not be created. This email is already registered'
    );
  }
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
