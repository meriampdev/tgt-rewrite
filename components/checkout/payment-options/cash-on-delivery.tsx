interface IProps {
  register: any
}
export default function CashOnDelivery(props: IProps) {
  return (
    <div className="relative border rounded-tl-md rounded-tr-md p-4 flex">
      <div className="flex items-center h-5">
        <input {...props.register("cod-payment")} value="cod-payment" id="cod-payment" name="payment_option" type="radio" className="focus:ring-green-500 h-4 w-4 text-green-600 cursor-pointer border-gray-300" defaultChecked />
      </div>
      <label htmlFor="cod-payment" className="ml-3 flex flex-col cursor-pointer">
        <span className="block text-sm font-bold">
          COD
        </span>
        <span className="block text-sm">
          Cash on Delivery
        </span>
      </label>
    </div>
  )
}