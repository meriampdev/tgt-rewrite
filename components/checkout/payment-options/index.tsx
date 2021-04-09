import CashOnDelivery from './cash-on-delivery'
import GCash from './gcash'
import BankTransfer from './bank-transfer'

interface IProps {
  register: any
  Controller: any 
  control: any
}
export default function PaymentOptions(props: IProps) {
  const { Controller, control } = props 

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="font-bold">Payment Options</span>
        <span className="text-sm ">All transactions are secure and encrypted.</span>
      </div>
      <div className="flex flex-col gap-5">
        <fieldset>
          <legend className="sr-only">
            Payment Option
          </legend>

          <div className="bg-white rounded-md -space-y-px">
            <CashOnDelivery register={props.register} />
            <GCash register={props.register} />
            <BankTransfer register={props.register} />
          </div>
        </fieldset>
      </div>
    </div>
  )
}