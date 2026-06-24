export default defineEventHandler(async (event) => {
  const { apiUrl, backendToken } = useRuntimeConfig(event)
  const path = Array.isArray(event.context.params?.path)
    ? event.context.params.path.join('/')
    : (event.context.params?.path ?? '')
  const method = event.node.req.method || 'GET'
  const cookieHeader = getRequestHeader(event, 'cookie')
  const hasBody = method !== 'GET' && method !== 'HEAD'

  const response = await $fetch.raw(`${apiUrl}/${path}`, {
    method,
    query: getQuery(event),
    body: hasBody ? await readBody(event).catch(() => undefined) : undefined,
    headers: {
      token: backendToken,
      ...(cookieHeader ? { cookie: cookieHeader } : {})
    }
  }).catch((err) => err.response)

  for (const setCookie of response.headers.getSetCookie?.() ?? []) {
    appendHeader(event, 'set-cookie', setCookie)
  }

  setResponseStatus(event, response.status)
  return response._data
})
