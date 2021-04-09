import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { removeFromCart } from '../../redux/cart/actions'

interface IProps {
  item: any 
}
export default function CartItem(props: IProps) {
  const { item } = props 
  const dispatch = useDispatch()
  const [ quantity, setQuantity ] = useState(item.cartQuantity)
  let imageSource = item.imageUrl ?? '/images/defaults/default-img.png'
  if(item.images && item.images?.length > 0) {
    imageSource = item.images[0].imageUrl
  }

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item))
  }

  const cost = parseFloat(item.unitCost).toFixed(2)
  const subTotal = parseFloat(cost) * quantity
  return (
    <div key={`mini-cart-${item.productId}`} className="mini-cart-item grid grid-cols-3 gap-5 border-dotted border-b-2 pb-2">
      <div className="h-24">
        <img className="h-full w-full object-contain" src={imageSource} alt="" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs md:text-base">{item.name}</span>
          <span className="text-xs italic">{item.sellingFeature}</span>
          <span className="text-sm font-bold">₱{cost}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <div className="flex flex-row justify-between gap-7">
          <div className="mini-cart-quantity-control w-full flex flex-row items-center justify-between gap-3">
            <IconButton onClick={() => setQuantity(quantity-1)}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <span className="text-sm">{quantity}</span>
            <IconButton onClick={() => setQuantity(quantity+1)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        <span className="text-sm md:text-xl font-bold">₱ {subTotal.toFixed(2)}</span>
        <Button onClick={handleRemoveItem} color="secondary">
          <span className="text-xs">Remove</span>
        </Button>
      </div>
    </div>
  )
}