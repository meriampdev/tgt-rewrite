import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { signIn, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ApplicationState } from '../redux/rootReducer'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CartItem from '../components/cart/cart-item'

export default function Cart() {
  const router = useRouter()
  const cart = useSelector((state: ApplicationState) => state.cart.data)
  const [ session, setSession ] = useState(null)

  useEffect(() => {
    (async () => {
      const userSession = await getSession()
      if(userSession) {
        setSession(userSession.user)
      }
    })()
  }, [])

  const onCheckout = () => {
    if(!session) {
      signIn()
    } else {
      router.push('/checkout');
    }
  }

  const onContinueShopping = () => {
    router.push('/shop')
  }

  let totalCost = 150
  let orderTotal = 0
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-10 p-5 md:p-20 bg-white">
      <div>
      {
        cart.map((item,i) => {
          let quantity = item.cartQuantity ?? 1
          const cost = parseFloat(item.unitCost).toFixed(2)
          const subTotal = parseFloat(cost) * quantity
          orderTotal += subTotal
          totalCost += subTotal
          return (<CartItem key={`cart-item-${i}`} item={item} />)
        })
      }
      </div>
      <div className="bg-gray-100 p-10">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-row gap-5 pb-5 border-dashed border-b-2">
            <div className="rounded shadow-sm flex-1">
              <input 
                type="text" 
                name="checkout-discount-code" 
                id="checkout-discount-code" 
                className="checkout-discount-code block w-full pl-10 sm:text-sm border-gray-300 rounded focus:ring-green-500 focus:border-green-500" 
                placeholder="Discount Code" 
              />
            </div>
            <Button className="round-sm" color="primary" onClick={() => {}}>Apply</Button>
          </div>
          <div className="flex flex-row items-center gap-5 pb-5 border-dashed border-b-2">
            <span>Sub-total</span>
            <span className="flex-1 font-bold text-xl text-right">₱ {orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-row items-center gap-5 pb-5 border-dashed border-b-2">
            <span>Shipping</span>
            <span className="flex-1 font-bold text-xl text-right">₱ 150.00</span>
          </div>
          <div className="flex flex-row items-center gap-5 pb-5 border-dashed border-b-2">
            <span>Total</span>
            <span className="flex-1 font-bold text-xl text-right">₱ {totalCost.toFixed(2)}</span>
          </div>
          <div className="mt-10">
            <Button variant="contained" onClick={onCheckout} className="w-full" color="primary">Checkout</Button>
          </div>
          <div className="mt-10 flex items-center w-full">
            <Button fullWidth color="primary" startIcon={<ShoppingCartOutlinedIcon />} onClick={onContinueShopping}>
              <span>Continue Shopping</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}