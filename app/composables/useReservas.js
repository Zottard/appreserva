export function useReservas() {
  return useApi('/reservas', { key: 'reservas' })
}

export function useReserva(id) {
  return useApi(`/reservas/${id}`, { key: `reserva-${id}` })
}

export function useReservaPasajeros(id) {
  return useApi(`/reservas/${id}/pasajeros`, { key: `reserva-${id}-pasajeros`, immediate: false })
}

export function useReservaItinerario(id) {
  return useApi(`/reservas/${id}/itinerario`, { key: `reserva-${id}-itinerario`, immediate: false })
}

export function useReservaHoteles(id) {
  return useApi(`/reservas/${id}/hoteles`, { key: `reserva-${id}-hoteles`, immediate: false })
}

export function useReservaVouchers(id) {
  return useApi(`/reservas/${id}/vouchers`, { key: `reserva-${id}-vouchers`, immediate: false })
}

export function useReservaContactos(id) {
  return useApi(`/reservas/${id}/contactos`, { key: `reserva-${id}-contactos`, immediate: false })
}
