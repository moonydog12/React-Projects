import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

type Props = {
  pizzaId: number
  currentQuantity: number
}

function UpdateItemQuantity({ pizzaId, currentQuantity }: Props) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>

      <span className="text-sm font-medium">{currentQuantity}</span>

      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  )
}

export default UpdateItemQuantity
