import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { validateApiKey, corsHeaders } from '@/lib/auth';

const DATA_PATH = join(process.cwd(), 'data', 'settings.json');

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const data = readFileSync(DATA_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data), { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }

  try {
    const updatedData = await request.json();
    writeFileSync(DATA_PATH, JSON.stringify(updatedData, null, 2));
    return NextResponse.json(updatedData, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500, headers: corsHeaders });
  }
}
