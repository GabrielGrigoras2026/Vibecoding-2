import { NextRequest, NextResponse } from 'next/server'
import { salveazaRezervare } from '@/lib/rezervari'
import { supabase } from '@/lib/supabase'

// POST - salvează o rezervare nouă
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = await salveazaRezervare(body)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Eroare necunoscută'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

// PATCH - schimbă statusul unei rezervări
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()
    const statusuriValide = ['în așteptare', 'confirmat', 'respins']
    if (!statusuriValide.includes(status)) {
      return NextResponse.json({ success: false, error: 'Status invalid' }, { status: 400 })
    }
    const { data, error } = await supabase
      .from('rezervari')
      .update({ status })
      .eq('id', id)
      .select()
    if (error) throw new Error(error.message)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Eroare necunoscută'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

// DELETE - șterge o rezervare
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const { error } = await supabase
      .from('rezervari')
      .delete()
      .eq('id', id)
    if (error) throw new Error(error.message)
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Eroare necunoscută'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
