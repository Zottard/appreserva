export function useReservas() {
  return useFetch('/api/reservas', { key: 'reservas' })
}

export function useReserva(id) {
  return useFetch(`/api/reservas/${id}`, { key: `reserva-${id}` })
}
