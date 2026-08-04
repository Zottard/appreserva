export default defineNuxtRouteMiddleware(async () => {
  try {
    await apiFetch('/auth/session')
  } catch (err) {
    const status = err?.response?.status
    if (status === 401 || status === 403) {
      return navigateTo('/login')
    }
  }
})
