export function apiFetch(path, opts = {}) {
  const { apiUrl } = useRuntimeConfig().public
  return $fetch(path, {
    baseURL: apiUrl,
    credentials: 'include',
    ...opts
  })
}

export function useApi(path, opts = {}) {
  const { apiUrl } = useRuntimeConfig().public
  return useFetch(path, {
    baseURL: apiUrl,
    credentials: 'include',
    ...opts
  })
}
