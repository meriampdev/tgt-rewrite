interface IProps {
  register: any
}
export default function GCash(props: IProps) {
  return (
    <div className="relative border border-gray-200 p-4 flex">
      <div className="flex items-center h-5">
        <input {...props.register("gcash-payment")} value="gcash-payment" id="gcash-payment" name="payment_option" type="radio" className="focus:ring-green-500 h-4 w-4 text-green-600 cursor-pointer border-gray-300" />
      </div>
      <label htmlFor="gcash-payment" className="ml-3 flex flex-col cursor-pointer">
        <span className="block text-sm font-bold">
          Gcash
        </span>
        <span className="block text-sm">
          Pay with Gcash
        </span>
      </label>
    </div>
  )
}