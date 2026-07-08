export function formatFecha(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function useImageUrl() {
  const { public: { imagesUrl } } = useRuntimeConfig()

  function imgSrc(img, fallback = null) {
    const src = img || fallback
    if (!src) return ''
    if (src.startsWith('http')) return src
    return `${imagesUrl}${src.replace(/^\//, '')}`
  }

  return { imgSrc }
}
