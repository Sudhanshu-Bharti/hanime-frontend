import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Encoding': 'identity',  // Request uncompressed content
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const headers = new Headers()
    const headersToForward = ['content-type', 'content-length', 'cache-control', 'expires', 'date']
    headersToForward.forEach(header => {
      const value = response.headers.get(header)
      if (value) headers.set(header, value)
    })

    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')

    const buffer = await response.arrayBuffer()
    return new NextResponse(buffer, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    })
  } catch (error) {
    console.error('Error proxying request:', error)
    return NextResponse.json({ error: 'Error fetching resource' }, { status: 500 })
  }
}