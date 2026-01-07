import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { startOfMonth, subMonths, endOfMonth } from 'date-fns';

export async function GET(request) {
  try {
    // Security: Check for Authorization Bearer token (Vercel Cron pattern)
    const authHeader = request.headers.get('Authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
    
    if (!authHeader || authHeader !== expectedAuth) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized', received: authHeader ? 'present' : 'missing' },
        { status: 401 }
      );
    }

    // Get environment variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Validate required environment variables
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
        },
        { status: 500 }
      );
    }

    // Create Supabase client with service role key (server-side only)
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Calculate date ranges
    const now = new Date();
    const currentMonthStart = startOfMonth(now); // 1st of current month
    const previousMonthStart = startOfMonth(subMonths(now, 1)); // 1st of previous month
    const previousMonthEnd = endOfMonth(subMonths(now, 1)); // Last day of previous month

    // Find all transactions from the previous month
    const { data: transactions, error: selectError } = await supabase
      .from('transactions')
      .select('id, created_at')
      .gte('created_at', previousMonthStart.toISOString())
      .lte('created_at', previousMonthEnd.toISOString());

    if (selectError) {
      console.error('Error fetching transactions:', selectError);
      return NextResponse.json(
        { ok: false, error: selectError.message },
        { status: 500 }
      );
    }

    if (!transactions || transactions.length === 0) {
      return NextResponse.json({
        ok: true,
        message: 'No transactions found from previous month',
        updated: 0,
        ts: new Date().toISOString(),
      });
    }

    // Update all transactions to the 1st of the current month
    const newDate = currentMonthStart.toISOString();
    const transactionIds = transactions.map(t => t.id);

    const { data: updatedData, error: updateError } = await supabase
      .from('transactions')
      .update({ created_at: newDate })
      .in('id', transactionIds);

    if (updateError) {
      console.error('Error updating transactions:', updateError);
      return NextResponse.json(
        { ok: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: `Successfully updated ${transactions.length} transaction(s) from previous month to ${currentMonthStart.toISOString()}`,
      updated: transactions.length,
      previousMonth: {
        start: previousMonthStart.toISOString(),
        end: previousMonthEnd.toISOString(),
      },
      newDate: newDate,
      ts: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update transactions monthly error:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

