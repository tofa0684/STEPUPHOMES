import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { validateApiKey, corsHeaders } from '@/lib/auth';

const DATA_PATH = join(process.cwd(), 'data', 'testimonials.json');

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
    const newItem = await request.json();
    const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
    
    const id = data.length > 0 ? Math.max(...data.map((i: any) => i.id || 0)) + 1 : 1;
    const itemWithId = { ...newItem, id };
    
    data.push(itemWithId);
    writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    
    return NextResponse.json(itemWithId, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500, headers: corsHeaders });
  }
}
