import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';

interface IProps {
  item: any
}
export default function AddToCartToast(props: any) {
  const router = useRouter()
  const { item } = props
  let imageSource = item.imageUrl ?? '/images/defaults/default-img.png'
  if(item.images && item.images?.length > 0) {
    imageSource = item.images[0].imageUrl
  }

  const onViewFullCart = () => {
    router.push('/cart');
  } 

  const cost = parseFloat(item.unitCost).toFixed(2)
  const quantity = item.cartQuantity ?? 1
  const subTotal = parseFloat(cost) * quantity
  return (
    <div className="text-gray-900 flex flex-col justify-center gap-5">
      <span>Added to your cart</span>
      <div key={`mini-cart-${item.productId}`} className="mini-cart-item grid grid-cols-3 items-center gap-3 pb-2">
        <div className="h-16">
          <img className="h-full w-full object-contain" src={imageSource} alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs">{item.name}</span>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <span className="text-xs">Qty ({quantity})</span>
          <span className="text-xs">₱{cost}</span>
          {/* <span className="text-xs">₱ {subTotal.toFixed(2)}</span> */}
        </div>
      </div>
      <div>
        <Button variant="contained" className="w-full" color="primary" onClick={onViewFullCart}>
          View Full Cart
        </Button>
      </div>
    </div>
  )
}