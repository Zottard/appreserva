export function useReservas() {
  return useApi('/reservas', { key: 'reservas' })
}

export function useReserva(id) {
  return useApi(`/reservas/${id}`, { key: `reserva-${id}` })
}

export function useReservaPasajeros(id) {
  return useApi(`/reservas/${id}/pasajeros`, { key: `reserva-${id}-pasajeros` })
}

export function useReservaItinerario(id) {
  return useApi(`/reservas/${id}/itinerario`, { key: `reserva-${id}-itinerario` })
}

export function useReservaHoteles(id) {
  return useApi(`/reservas/${id}/hoteles`, { key: `reserva-${id}-hoteles` })
}

export function useReservaVouchers(id) {
  return useApi(`/reservas/${id}/vouchers`, { key: `reserva-${id}-vouchers` })
}

export function useReservaContactos(id) {
  return useApi(`/reservas/${id}/contactos`, { key: `reserva-${id}-contactos` })
}
