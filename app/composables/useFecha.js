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
  // Tomar solo YYYY-MM-DD y construir con new Date(y, m, d) para forzar hora local
  const [year, month, day] = iso.substring(0, 10).split('-').map(Number)
  const d = new Date(year, month - 1, day + 1)
  const dayStr = d.toLocaleDateString('es-AR', { day: 'numeric' })
  const monthStr = d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '')
  return `${dayStr} ${monthStr.charAt(0).toUpperCase()}${monthStr.slice(1)}`
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
