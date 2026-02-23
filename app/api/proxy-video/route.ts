import { NextRequest, NextResponse } from 'next/server'

// Static allowlist for well-known CDN hostnames
const ALLOWED_HOSTS = [
  'streamable.cloud',
  'hanime.tv',
  'hanime-cdn.com',
  'highwinds-cdn.com',          // matches *.highwinds-cdn.com (m3u8s, community-uploads, etc.)
  'm3u8s.highwinds-cdn.com',
  'freeanimehentai.net',        // matches *.freeanimehentai.net
  'cached.freeanimehentai.net',
  'htv-services.com',
]

function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false
    const h = url.hostname
    // Static list
    if (ALLOWED_HOSTS.some(host => h === host || h.endsWith(`.${host}`))) return true
    // Dynamic: segment servers with numbered subdomains
    // Pattern: [prefix].[name]-25x-[num].top  e.g. s33.hydaelyn-25x-18.top, s32.zodiark-25x-02.top
    if (h.includes('-25x-') && h.endsWith('.top')) return true
    // htv-[name].com variants: p34.htv-hydaelyn.com, p25.htv-warrior-of-light.com etc.
    if (h.includes('.htv-') && h.endsWith('.com')) return true
    return false
  } catch {
    return false
  }
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Range, Content-Type',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Type, Accept-Ranges',
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
    console.warn(`[proxy-video] Blocked non-allowlisted URL: ${url}`)
    return NextResponse.json({ error: 'URL not in allowlist' }, { status: 400, headers: CORS_HEADERS })
  }

  try {
    const rangeHeader = req.headers.get('range')

    const fetchHeaders: Record<string, string> = {
      'Referer': 'https://hanime.tv/',
      'Origin': 'https://hanime.tv',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }
    if (rangeHeader) fetchHeaders['Range'] = rangeHeader

    const upstream = await fetch(url, { headers: fetchHeaders })

    // Non-success and not partial content
    if (!upstream.ok && upstream.status !== 206) {
      const body = await upstream.text().catch(() => '')
      console.error(`[proxy-video] upstream ${upstream.status} for ${url} — ${body.slice(0, 200)}`)
      return NextResponse.json(
        { error: `Upstream returned ${upstream.status}`, url },
        { status: upstream.status < 600 ? upstream.status : 502, headers: CORS_HEADERS }
      )
    }

    const contentType = upstream.headers.get('content-type') ?? ''
    const isM3u8 = contentType.includes('mpegurl') || url.split('?')[0].endsWith('.m3u8')

    // ── HLS Manifest: rewrite all segment URLs to route through this proxy ──
    if (isM3u8) {
      const text = await upstream.text()
      const base = new URL(url)

      const rewritten = text
        .split('\n')
        .map(line => {
          const trimmed = line.trim()

          // Rewrite URI="..." in tags like #EXT-X-KEY, #EXT-X-MAP
          const tagUriMatch = trimmed.match(/URI="([^"]+)"/)
          if (tagUriMatch) {
            const abs = new URL(tagUriMatch[1], base).toString()
            return line.replace(
              tagUriMatch[1],
              `/api/proxy-video?url=${encodeURIComponent(abs)}`
            )
          }

          // Skip directives and blank lines
          if (trimmed === '' || trimmed.startsWith('#')) return line

          // Rewrite segment lines (relative or absolute)
          try {
            const abs = new URL(trimmed, base).toString()
            return `/api/proxy-video?url=${encodeURIComponent(abs)}`
          } catch {
            return line
          }
        })
        .join('\n')

      return new NextResponse(rewritten, {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Cache-Control': 'no-cache, no-store',
        },
      })
    }

    // ── Binary segments / TS chunks: stream body directly ──
    const responseHeaders = new Headers(CORS_HEADERS)
    const forward = ['content-type', 'content-length', 'content-range', 'accept-ranges', 'cache-control']
    forward.forEach(h => {
      const v = upstream.headers.get(h)
      if (v) responseHeaders.set(h, v)
    })

    // body can be null for 204/304; guard it
    return new NextResponse(upstream.body ?? null, {
      status: upstream.status,
      headers: responseHeaders,
    })

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[proxy-video] Exception for ${url}:`, message)
    return NextResponse.json(
      { error: 'Proxy error', detail: message },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}