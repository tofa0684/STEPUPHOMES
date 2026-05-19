'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Auth Actions
export async function signOut() {
  const supabase = (await createClient()) as any;
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// Dashboard Actions
export async function getDashboardStats() {
  const supabase = (await createClient()) as any;
  
  const { count: propertiesCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true });
    
  const { count: inquiriesCount } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');
    
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
    
  return {
    propertiesCount: propertiesCount || 0,
    inquiriesCount: inquiriesCount || 0,
    recentInquiries: recentInquiries || []
  };
}

// Properties Actions
export async function getProperties() {
  const supabase = (await createClient()) as any;
  const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function saveProperty(propertyData: any) {
  const supabase = (await createClient()) as any;
  const { id, ...fields } = propertyData;

  if (id) {
    // Update
    const { error } = await supabase
      .from('properties')
      .update(fields as any)
      .eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    // Insert
    const { error } = await supabase
      .from('properties')
      .insert(fields as any);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/admin/listings');
  revalidatePath('/');
}

export async function deleteProperty(id: string) {
  const supabase = (await createClient()) as any;
  await supabase.from('properties').delete().eq('id', id);
  revalidatePath('/admin/listings');
  revalidatePath('/');
}

// Inquiries Actions
export async function getInquiries() {
  const supabase = (await createClient()) as any;
  const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = (await createClient()) as any;
  await supabase.from('inquiries').update({ status }).eq('id', id);
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
}

export async function deleteInquiry(id: string) {
  const supabase = (await createClient()) as any;
  await supabase.from('inquiries').delete().eq('id', id);
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
}

// Agent Profile Actions
export async function getAgentProfile() {
  const supabase = (await createClient()) as any;
  const { data } = await supabase.from('agent_profile').select('*').single();
  return data;
}

export async function updateAgentProfile(profileData: any) {
  const supabase = (await createClient()) as any;
  const { id, ...fields } = profileData;

  const { error } = await supabase
    .from('agent_profile')
    .update(fields as any)
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/settings');
  revalidatePath('/');
}

// Settings Actions
export async function getSettings() {
  const supabase = (await createClient()) as any;
  const { data } = await supabase.from('settings').select('*').single();
  return data;
}

export async function updateSettings(settingsData: any) {
  const supabase = (await createClient()) as any;
  const { id, ...fields } = settingsData;

  const { error } = await supabase
    .from('settings')
    .update(fields as any)
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/settings');
  revalidatePath('/');
}

// Testimonials Actions
export async function getTestimonials() {
  const supabase = (await createClient()) as any;
  const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function saveTestimonial(testimonialData: any) {
  const supabase = (await createClient()) as any;
  const { id, ...fields } = testimonialData;

  if (id) {
    const { error } = await supabase
      .from('testimonials')
      .update(fields as any)
      .eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from('testimonials')
      .insert(fields as any);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/admin/settings');
  revalidatePath('/');
}

export async function deleteTestimonial(id: string) {
  const supabase = (await createClient()) as any;
  await supabase.from('testimonials').delete().eq('id', id);
  revalidatePath('/admin/settings');
  revalidatePath('/');
}
