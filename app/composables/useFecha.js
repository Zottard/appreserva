export function formatFecha(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const IMG_BASE = 'https://img-dev.tourexperto.com'

export function imgSrc(img) {
  if (!img) return ''
  if (img.startsWith('http')) return img
  return `${IMG_BASE}/${img.replace(/^\//, '')}`
}
