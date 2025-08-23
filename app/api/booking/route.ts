import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    // Check if Sanity is properly configured
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ktpg5qcd'
    if (projectId === 'your-project-id') {
      return NextResponse.json(
        { success: false, error: 'Sanity niet geconfigureerd. Neem telefonisch contact op.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    
    const booking = await client.create({
      _type: 'booking',
      name: body.name,
      email: body.email,
      phone: body.phone,
      date: body.date,
      time: body.time,
      package: body.package,
      carBrand: body.carBrand || '',
      carModel: body.carModel || '',
      message: body.message || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis. Neem telefonisch contact op met Max (0613063822) of Henri (0643645299).' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check if Sanity is properly configured
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ktpg5qcd'
    if (projectId === 'your-project-id') {
      return NextResponse.json(
        { bookings: [], error: 'Sanity niet geconfigureerd' },
        { status: 200 }
      )
    }

    const bookings = await client.fetch(`
      *[_type == "booking"] | order(date desc, time desc) {
        _id,
        name,
        email,
        phone,
        date,
        time,
        package,
        carBrand,
        carModel,
        message,
        status,
        createdAt
      }
    `)

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { bookings: [], error: 'Failed to fetch bookings' },
      { status: 200 }
    )
  }
}