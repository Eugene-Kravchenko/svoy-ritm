'use client';

import {createClient} from '@supabase/supabase-js';

const url=import.meta.env.VITE_SUPABASE_URL||'';
const key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||'';

export const cloudEnabled=Boolean(url&&key);
export const basePath=import.meta.env.VITE_BASE_PATH||'';
export const supabase=cloudEnabled?createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;

export async function currentCloudUser(){
  if(!supabase)return null;
  const {data,error}=await supabase.auth.getUser();
  if(error)return null;
  return data.user;
}

export async function loadCloudPayload(){
  if(!supabase)throw new Error('Облачное хранение не настроено.');
  const user=await currentCloudUser();
  if(!user)return {user:null,payload:null};
  const {data,error}=await supabase.from('journals').select('payload').eq('user_id',user.id).maybeSingle();
  if(error)throw error;
  return {user,payload:data?.payload??null};
}

export async function saveCloudPayload(payload:unknown){
  if(!supabase)throw new Error('Облачное хранение не настроено.');
  const user=await currentCloudUser();
  if(!user)throw new Error('Войди в журнал ещё раз.');
  const {error}=await supabase.from('journals').upsert({user_id:user.id,payload,updated_at:new Date().toISOString()},{onConflict:'user_id'});
  if(error)throw error;
}

export async function sendMagicLink(email:string){
  if(!supabase)throw new Error('Облачное хранение не настроено.');
  const redirectTo=typeof window==='undefined'?undefined:window.location.origin+basePath+'/';
  const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:redirectTo}});
  if(error)throw error;
}

export async function signInWithPassword(email:string,password:string){
  if(!supabase)throw new Error('Облачное хранение не настроено.');
  const {error}=await supabase.auth.signInWithPassword({email,password});
  if(error)throw error;
}

export async function signUpWithPassword(email:string,password:string){
  if(!supabase)throw new Error('Облачное хранение не настроено.');
  const {data,error}=await supabase.auth.signUp({email,password});
  if(error)throw error;
  return data;
}
