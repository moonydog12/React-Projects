import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useDeleteCabin() {
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      toast.success('Cabin successfully deleted')

      // invalidate the query, so the data will be refetch when it is updated
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteCabin }
}
