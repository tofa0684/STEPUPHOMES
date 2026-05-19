import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { validateApiKey, corsHeaders } from '@/lib/auth';

const DATA_PATH = join(process.cwd(), 'data', 'properties.json');

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }

  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const updatedFields = await request.json();
    const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
    
    const index = data.findIndex((i: any) => i.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
    }
    
    data[index] = { ...data[index], ...updatedFields, id }; // Ensure ID stays same
    writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    
    return NextResponse.json(data[index], { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }

  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
    
    const filteredData = data.filter((i: any) => i.id !== id);
    if (data.length === filteredData.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
    }
    
    writeFileSync(DATA_PATH, JSON.stringify(filteredData, null, 2));
    
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500, headers: corsHeaders });
  }
}
