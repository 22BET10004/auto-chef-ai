import { NextResponse } from 'next/server'
import { detectFoodFromFileName } from '@/utils/foodImageMock'

export async function POST(req) {
  try {
    const { fileName } = await req.json()
    const result = detectFoodFromFileName(fileName)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Food detection failed', detail: error.message }, { status: 500 })
  }
}
