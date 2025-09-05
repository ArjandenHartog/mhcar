import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const payload = JSON.parse(body)
    
    // Security check with multiple methods
    const token = request.headers.get('authorization')
    const signature = request.headers.get('x-sanity-signature')
    
    // Check bearer token
    if (process.env.REVALIDATE_TOKEN && token !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
    
    // Check webhook signature if configured
    if (process.env.SANITY_WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.SANITY_WEBHOOK_SECRET)
        .update(body)
        .digest('hex')
      
      if (signature !== `sha256=${expectedSignature}`) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
      }
    }

    const documentType = payload._type
    console.log(`Revalidating for document type: ${documentType}`)

    // Revalidate based on document type
    switch (documentType) {
      case 'homePage':
        revalidatePath('/')
        break
      
      case 'aboutPage':
        revalidatePath('/over-ons')
        break
      
      case 'siteSettings':
        // Site settings affect all pages
        revalidatePath('/')
        revalidatePath('/over-ons')
        revalidatePath('/pakketten')
        revalidatePath('/afspraak')
        break
      
      case 'service':
        revalidatePath('/')
        revalidatePath('/pakketten')
        if (payload.slug?.current) {
          revalidatePath(`/pakketten/${payload.slug.current}`)
        }
        break
      
      case 'navigation':
        // Navigation affects all pages
        revalidatePath('/')
        revalidatePath('/over-ons')
        revalidatePath('/pakketten')
        revalidatePath('/afspraak')
        break
      
      default:
        // For other document types or manual revalidation
        revalidatePath('/')
        if (payload.slug?.current) {
          revalidatePath(`/${payload.slug.current}`)
        }
    }

    return NextResponse.json({ 
      revalidated: true,
      documentType,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}