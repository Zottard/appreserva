export function formatFecha(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const S3 = 'https://tex2-static-images-prd.s3.us-east-1.amazonaws.com'

export function imgSrc(img) {
  if (!img) return ''
  if (img.startsWith('http')) return img
  if (img.includes('/')) return `${S3}/${img.replace(/^\//, '')}`
  return `${S3}/productos/${img}`
}

export function imgFallback(img) {
  if (!img || img.startsWith('http') || img.includes('/')) return null
  return `${S3}/test-image-prod/${img}`
}
