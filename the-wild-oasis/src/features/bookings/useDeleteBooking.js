import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export function useDeleteBooking() {
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      toast.success('Booking successfully deleted')

      // invalidate the query, so the data will be refetch when it is updated
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteBooking }
}
