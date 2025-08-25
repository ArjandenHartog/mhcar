import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simple security check - you can add more robust validation
    const token = request.headers.get('authorization')
    if (token !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    // Revalidate the homepage
    revalidatePath('/')
    
    // Also revalidate other pages if needed
    if (body.slug) {
      revalidatePath(`/${body.slug}`)
    }

    return NextResponse.json({ 
      revalidated: true,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}