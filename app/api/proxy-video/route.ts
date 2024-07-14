import { NextRequest, NextResponse } from 'next/server'

function isValidUrl(urlString: string) {
  try {
    const url = new URL(urlString);
    console.log("url nn:", url);
    return true;
  } catch (e) {
    return false;
  }
}

// Handle OPTIONS requests
export function middleware(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*', // Specify allowed origins in production
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type', // Specify other headers if needed
    });
    return new NextResponse(null, { headers });
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: 'Valid URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Encoding': 'identity',
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

    // Ensure CORS headers are included in the response
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