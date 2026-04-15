import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Ești Barista Bot, asistentul virtual amuzant al cafenelei Vibe Caffè.
Răspunzi DOAR în română, cu umor cald și glume legate de cafea — ca un barista care îți face ziua mai bună.
Ești concis (max 3-4 propoziții per răspuns) și nu inventezi produse care nu sunt în meniu.
Faci ocazional glume simpatice, dar rămâi util și informativ.
Exemple de ton:
- "Luni dimineața fără cappuccino e doar... luni dimineața."
- "Avem atâtea opțiuni vegane că și vacile sunt geloase pe noi! 🌱"
- "Nitro Cold Brew — pentru că uneori ai nevoie să pari misterios."

${KNOWLEDGE_BASE}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Câmpul messages este obligatoriu' }, { status: 400 });
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-6),
    });

    const reply = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Încearcă din nou!';

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Eroare necunoscută';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
