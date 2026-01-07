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
    const { data, error } = await supabase
      .from('transactions')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Heartbeat query error:', error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      ok: true,
      ts: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Heartbeat endpoint error:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

