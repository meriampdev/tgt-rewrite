interface IProps {
  register: any
}
export default function BankTransfer(props: IProps) {
  return (
    <div className="relative border border-gray-200 rounded-bl-md rounded-br-md p-4 flex">
      <div className="flex items-center h-5">
        <input {...props.register("bank-payment")} value="bank-payment" id="bank-payment" name="payment_option" type="radio" className="focus:ring-green-500 h-4 w-4 text-green-600 cursor-pointer border-gray-300" />
      </div>
      <label htmlFor="bank-payment" className="ml-3 flex flex-col cursor-pointer">
        <span className="block text-sm font-bold">
          Bank Transfer
        </span>
        <span className="block text-sm">
          Lorem ipsum
        </span>
      </label>
    </div>
  )
}