import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux/rootReducer'
import Button from '@material-ui/core/Button';

export default function CheckoutOrderSummary() {
  const cart = useSelector((state: ApplicationState) => state.cart.data)

  let totalCost = 150
  let orderTotal = 0
  return (
    <div>
      <div className="flex flex-col gap-5 md:hidden p-5">
        <div className="w-1/2 mb-5 md:hidden">
          <img src="/images/TGT-logo-full.png" alt="" />
        </div>
        <span>Show Order Summary</span>
      </div>
      <div className="hidden md:flex flex-col gap-5 p-5 pt-10 bg-gray-100">
        <span className="font-bold text-lg">Order Summary</span>
        <div className="border-dashed border-b-2 pb-5 flex flex-col gap-5">
        {
          cart.map((item: any,i: number) => {
            let imageSource = item.imageUrl ?? '/images/defaults/default-img.png'
            if(item.images && item.images?.length > 0) {
              imageSource = item.images[0].imageUrl
            }
            let quantity = item.cartQuantity ?? 1
            const cost = parseFloat(item.unitCost).toFixed(2)
            const subTotal = parseFloat(cost) * quantity
            orderTotal += subTotal
            totalCost += subTotal
            return (
              <div className="grid grid-cols-3 gap-5 items-center" key={`order-${i}`}>
                <div className="h-24">
                  <img className="h-full w-full object-contain" src={imageSource} alt="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-base">{item.name}</span>
                  <span className="text-xs italic">{item.sellingFeature}</span>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <span className="text-xs md:text-base">₱{cost} ({quantity})</span>
                  <span className="text-sm md:text-xl font-bold">₱ {subTotal.toFixed(2)}</span>
                </div>
              </div>)
          })
        }
        </div>
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
        <div className="flex flex-row gap-5 pb-5 border-dashed border-b-2">
          <span>Sub-total</span>
          <span className="flex-1 font-bold text-xl text-right">₱ {orderTotal.toFixed(2)}</span>
        </div>
        <div className="flex flex-row gap-5 pb-5 border-dashed border-b-2">
          <span>Shipping</span>
          <span className="flex-1 font-bold text-xl text-right">₱ 150.00</span>
        </div>
        <div className="flex flex-row gap-5 pb-5 border-dashed border-b-2">
          <span>Total</span>
          <span className="flex-1 font-bold text-xl text-right">₱ {totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}