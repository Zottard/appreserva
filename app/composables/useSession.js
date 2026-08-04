export function useSession() {
  const name = useState('session:name', () => '')
  const { logout } = useAuth()

  async function loadName() {
    if (name.value) return
    try {
      const usuario = await apiFetch('/auth/session')
      name.value = usuario?.nombre || ''
    } catch {
      name.value = ''
    }
  }

  async function signOut() {
    await logout()
    name.value = ''
    await navigateTo('/login')
  }

  return { name, loadName, signOut }
}
