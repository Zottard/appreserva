export function useAuthStatus() {
  const authenticated = ref(false)
  const resolved = ref(false)

  async function check() {
    try {
      await apiFetch('/auth/session')
      authenticated.value = true
    } catch {
      authenticated.value = false
    }
    resolved.value = true
  }

  onMounted(check)

  return { authenticated, resolved }
}
