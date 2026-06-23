export default defineNuxtRouteMiddleware(async () => {
  try {
    await apiFetch('/reservas')
  } catch (err) {
    if (err?.response?.status === 401) {
      return navigateTo('/login')
    }
  }
})
