import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const ingredients = body.ingredients || ''

    // Basic prompt - refine with prompt engineering in real project
    const prompt = `You are a helpful chef. Given these ingredients: ${ingredients}. Provide a clear recipe with title, ingredients list, steps, approximate time and serving size.`

    // Call to OpenAI: in real project, use server-side OpenAI client and secret key
    // Example using fetch to OpenAI REST API:
    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      return NextResponse.json({ error: 'OpenAI API key not found in environment.' }, { status: 500 })
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.8
      })
    })

    if (!resp.ok) {
      const errText = await resp.text()
      return NextResponse.json({ error: 'OpenAI request failed', detail: errText }, { status: 502 })
    }

    const json = await resp.json()
    const text = json.choices?.[0]?.message?.content || JSON.stringify(json)
    return NextResponse.json({ text })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
