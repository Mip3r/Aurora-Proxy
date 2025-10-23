// Cloudflare Worker example proxy
// Deploy this with `wrangler` or Cloudflare dashboard. This is for educational use only.

addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request){
  const urlParam = new URL(request.url).searchParams.get('url')
  if(!urlParam) return new Response('Missing url parameter', { status: 400 })

  let target
  try{ target = new URL(urlParam) }catch(e){ return new Response('Invalid url', { status: 400 }) }

  const resp = await fetch(target.toString(), {
    method: request.method,
    headers: request.headers
  })

  // Clone response and strip framing/security headers that would prevent embedding
  const newHeaders = new Headers(resp.headers)
  newHeaders.delete('content-security-policy')
  newHeaders.delete('x-frame-options')
  newHeaders.set('access-control-allow-origin','*')

  const body = await resp.arrayBuffer()
  return new Response(body, { status: resp.status, headers: newHeaders })
}
