// Test ID: IIDSAT

import { useLoaderData } from 'react-router-dom'
import { getOrder } from '../../ui/services/apiRestaurant'
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers'

type loaderProps = {
  orderId: string
}

type cartItem = {
  name: string
  pizzaId: number
  quantity: number
  totalPrice: number
  unitPrice: number
}

type OrderProps = {
  customer: string
  id: string
  status: string
  orderPrice: number
  priority: boolean
  priorityPrice: number
  cart: cartItem[]
  estimatedDelivery: Date
}

export async function loader({ params }: { params: loaderProps }) {
  const order = await getOrder(params.orderId)
  return order
}

function Order() {
  const order = useLoaderData() as OrderProps

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order
  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  )
}

export default Order
