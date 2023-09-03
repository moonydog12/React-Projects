import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../ui/services/apiRestaurant'

type MyParams = {
  orderId: string
}

function UpdateOrder() {
  const fetcher = useFetcher()
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  )
}

export default UpdateOrder

export async function action({ params }: { params: MyParams }) {
  const data = { priority: true }
  await updateOrder(params.orderId, data)
  return null
}
