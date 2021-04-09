import PaymentOptions from './payment-options'

interface IProps {
  register: any
  Controller: any 
  control: any
}
export default function Payment(props: IProps) {
  return (
    <div className="flex flex-col gap-5">
      <PaymentOptions register={props.register} Controller={props.Controller} control={props.control} />
    </div>
  )
}