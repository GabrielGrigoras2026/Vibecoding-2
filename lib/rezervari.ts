import { supabase } from './supabase'

export interface Rezervare {
  nume: string
  email: string
  telefon: string
  numar_persoane?: number
  data: string
  ora: string
}

export async function salveazaRezervare(rezervare: Rezervare) {
  const { data, error } = await supabase
    .from('rezervari')
    .insert([rezervare])
    .select()

  if (error) throw new Error(error.message)
  return data
}

export async function citesteRezervari() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}
