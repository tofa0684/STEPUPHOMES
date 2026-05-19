import { NextResponse } from 'next/server';
import { validateApiKey, corsHeaders } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  // Allow authentication either via Session Cookie (admin dashboard) OR Bearer Token (legacy)
  const supabaseServer = (await createClient()) as any;
  const { data: { user } } = await supabaseServer.auth.getUser();

  const isApiAuthorized = validateApiKey(request);
  
  if (!user && !isApiAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400, headers: corsHeaders });
    }

    // Convert file to ArrayBuffer/Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use service role admin client to perform storage operations (bypassing client RLS constraints if needed)
    const supabaseAdmin = createAdminClient() as any;

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('stepuphomes-assets')
      .upload(`uploads/${filename}`, buffer, {
        contentType: file.type,
        duplex: 'half'
      } as any);

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError);
      throw uploadError;
    }

    // Retrieve the public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('stepuphomes-assets')
      .getPublicUrl(uploadData.path);

    return NextResponse.json({ url: publicUrlData.publicUrl }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500, headers: corsHeaders });
  }
}
