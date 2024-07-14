import { NextRequest, NextResponse } from 'next/server'

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
  