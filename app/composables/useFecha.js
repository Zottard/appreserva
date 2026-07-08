export function formatFecha(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function imgSrc(img, imgBase) {
  if (!img) return ''
  if (img.startsWith('http')) return img
  return `${imgBase}/${img.replace(/^\//, '')}`
}
