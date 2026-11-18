const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')

export function createWhatsAppUrl(message) {
  if (!/^\d{7,15}$/.test(whatsappNumber)) return null
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
