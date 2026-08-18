export function formatFecha(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatShortDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }).replace('.', '')
}

export function formatDayMonth(iso) {
  if (!iso) return ''
  // Date-only strings (YYYY-MM-DD) son UTC; forzar local para evitar el shift de día
  const str = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00` : iso
  const d = new Date(str)
  const day = d.toLocaleDateString('es-AR', { day: 'numeric' })
  const month = d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '')
  return `${day} ${month.charAt(0).toUpperCase()}${month.slice(1)}`
}

export function useImageUrl() {
  const { public: { imagesUrl } } = useRuntimeConfig()

  function imgSrc(img, fallback = null) {
    const src = img || fallback
    if (!src) return ''
    if (src.startsWith('http') || src.startsWith('/')) return src
    return `${imagesUrl}${src}`
  }

  return { imgSrc }
}
