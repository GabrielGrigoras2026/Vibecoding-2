import { NextRequest, NextResponse } from 'next/server'
import { salveazaRezervare } from '@/lib/rezervari'

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
