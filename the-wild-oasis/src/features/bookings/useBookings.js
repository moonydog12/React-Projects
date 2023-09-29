import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  // Filter
  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  // Pagination
  const page = !searchParams.get('page') ? 1 : parseInt(searchParams.get('page'), 10)

  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // dependency array, when one of the element changed,react query will refetching data & store it in cache
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE) // Computed value to make sure no extra fetch

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })
  }

  return { isLoading, error, bookings, count }
}
