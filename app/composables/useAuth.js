export function useAuth() {
  function requestMagicLink(email) {
    return apiFetch('/auth/magic-link', { method: 'POST', body: { email } })
  }

  function verify(token) {
    return apiFetch('/auth/verify', { query: { token } })
  }

  function logout() {
    return apiFetch('/auth/logout', { method: 'POST' })
  }

  return { requestMagicLink, verify, logout }
}
