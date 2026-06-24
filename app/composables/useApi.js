export function apiFetch(path, opts = {}) {
  const { apiUrl, backendToken } = useRuntimeConfig().public
  return $fetch(path, {
    baseURL: apiUrl,
    credentials: 'include',
    ...opts,
    headers: { token: backendToken, ...opts.headers }
  })
}

export function useApi(path, opts = {}) {
  const { apiUrl, backendToken } = useRuntimeConfig().public
  return useFetch(path, {
    baseURL: apiUrl,
    credentials: 'include',
    ...opts,
    headers: { token: backendToken, ...opts.headers }
  })
}
