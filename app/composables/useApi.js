export function apiFetch(path, opts = {}) {
  return $fetch(path, {
    baseURL: '/api/pwa',
    credentials: 'include',
    ...opts
  })
}

export function useApi(path, opts = {}) {
  return useFetch(path, {
    baseURL: '/api/pwa',
    credentials: 'include',
    ...opts
  })
}
