import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice'

type Props = {
  pizzaId: number
}

function DeleteItem({ pizzaId }: Props) {
  const dispatch = useDispatch()
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  )
}

export default DeleteItem
