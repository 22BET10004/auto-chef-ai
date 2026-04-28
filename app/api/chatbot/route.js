import { NextResponse } from 'next/server'

const responses = {
  'what should i eat today': 'Focus on balanced meals: protein-rich breakfast, fiber-rich lunch, and light dinner.',
  'calories in rice': 'One bowl of cooked rice has around 200-220 calories.',
  'best food for weight loss': 'Choose high-protein and high-fiber foods like dal, sprouts, paneer, and leafy vegetables.'
}

export async function POST(req) {
  try {
    const { message } = await req.json()
    const key = String(message || '').toLowerCase()
    const answer = Object.entries(responses).find(([q]) => key.includes(q))?.[1]
    return NextResponse.json({
      answer:
        answer ||
        'I can help with calories, meal timing, and healthy Indian diet suggestions. Try asking about specific food.'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Chatbot failed', detail: error.message }, { status: 500 })
  }
}
