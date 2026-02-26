import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const ALLOWED_HOSTS = [
  'hanime-cdn.com',
  'images.ctfassets.net',
  'iili.io',
  'cdn.discordapp.com',
  'static-assets-44d.pages.dev',
]

function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false
    const h = url.hostname
    return ALLOWED_HOSTS.some(host => h === host || h.endsWith(`.${host}`))
  } catch {
    return false
  }
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'url parameter required' }, { status: 400, headers: CORS_HEADERS })
  }

  if (!isAllowedUrl(url)) {
    console.warn(`[proxy-image] Blocked non-allowlisted URL: ${url}`)
    return NextResponse.json({ error: 'URL not in allowlist' }, { status: 400, headers: CORS_HEADERS })
  }

  try {
    const fetchHeaders: Record<string, string> = {
      'Referer': 'https://hanime.tv/',
      'Origin': 'https://hanime.tv',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    }

    const upstream = await fetch(url, { headers: fetchHeaders })

    if (!upstream.ok) {
      const body = await upstream.text().catch(() => '')
      console.error(`[proxy-image] upstream ${upstream.status} for ${url} — ${body.slice(0, 200)}`)
      return NextResponse.json(
        { error: `Upstream returned ${upstream.status}`, url },
        { status: upstream.status < 600 ? upstream.status : 502, headers: CORS_HEADERS }
      )
    }

    const responseHeaders = new Headers(CORS_HEADERS)
    const forward = ['content-type', 'content-length', 'cache-control', 'etag']
    forward.forEach(h => {
      const v = upstream.headers.get(h)
      if (v) responseHeaders.set(h, v)
    })

    if (!responseHeaders.has('Cache-Control')) {
      responseHeaders.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600')
    }

    return new NextResponse(upstream.body ?? null, {
      status: upstream.status,
      headers: responseHeaders,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[proxy-image] Exception for ${url}:`, message)
    return NextResponse.json(
      { error: 'Proxy error', detail: message },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
