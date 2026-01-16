import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

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

    // Get environment variables (fallback to NEXT_PUBLIC_ version if needed)
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

    // Run minimal query against transactions table
    const { data: selectData, error: selectError } = await supabase
      .from('transactions')
      .select('id')
      .limit(1);

    if (selectError) {
      console.error('Heartbeat SELECT error:', selectError);
      return NextResponse.json(
        { ok: false, error: selectError.message },
        { status: 500 }
      );
    }

    // Insert a test transaction to exercise INSERT operation
    const testTransaction = {
      userId: 'heartbeat-system',
      type: 'expense',
      category: 'other',
      price: 1,
      notes: 'HEARTBEAT_TEST_DELETE_ME'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('transactions')
      .insert([testTransaction])
      .select('id')
      .single();

    if (insertError) {
      console.error('Heartbeat INSERT error:', insertError);
      return NextResponse.json(
        { ok: false, error: insertError.message },
        { status: 500 }
      );
    }

    // Delete the test transaction to exercise DELETE operation
    const { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .eq('id', insertData.id);

    if (deleteError) {
      console.error('Heartbeat DELETE error:', deleteError);
      return NextResponse.json(
        { ok: false, error: deleteError.message },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      ok: true,
      ts: new Date().toISOString(),
      operations: ['SELECT', 'INSERT', 'DELETE']
    });
  } catch (error) {
    console.error('Heartbeat endpoint error:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

