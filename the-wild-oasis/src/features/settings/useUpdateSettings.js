import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateSetting as updateSettingAPI } from '../../services/apiSettings'

export function useUpdateSetting() {
  const queryClient = useQueryClient()
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success('Setting successfully edited')

      // Refetch the data immediately when we update it in the front-end
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isUpdating, updateSetting }
}
