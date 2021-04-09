import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from "react-hook-form"
import { getSession } from 'next-auth/client'
import OrderSummary from '../components/checkout/order-summary'
import Customer from '../components/checkout/customer'
import Shipping from '../components/checkout/shipping'
import Payment from '../components/checkout/payment'
import Stepper from '../components/common/stepper'
import { formFields, steps } from '../components/checkout/constants'
import Button from '@material-ui/core/Button';

export default function Checkout() {
  const router = useRouter()
  const { register, handleSubmit, watch, control } = useForm();
  const [ session, setSession ] = useState(null)
  const [ disableNext, setNext ] = useState(false)

  useEffect(() => {
    (async () => {
      const userSession = await getSession()
      if(userSession) {
        setSession(userSession.user)
      }
    })()
  }, [])

  const onNavigateStep = (step: string) => {
    setNext(false)
    if(step === 'Cart') {
      router.push('/cart')
    } else if (step === 'Shipping') {
      // setNext(true)
    }
  }

  const onCompleteOrder = (data) => {
    console.log('onCompleteOrder', data)
  }

  return (
    <div className="checkout-wrapper flex justify-end md:grid-cols-2 md:grid h-full" style={{minHeight: '100vh'}}>
      <div className="flex flex-col gap-5 p-6 md:p-20">
        <div className="w-1/2 mb-5 hidden md:flex">
          <img src="/images/TGT-logo-full.png" alt="" />
        </div>
        <Stepper 
          userAtStep={2} 
          disableSteps={session === null}
          disabledStepStart={2}
          disableNextStep={disableNext}
          onNavigateStep={onNavigateStep}
          startAt={1}
          steps={steps} 
          type="breadcrumb"
          lastStepHandler={<Button variant="contained" color="primary" onClick={handleSubmit(onCompleteOrder)}>Complete Order</Button>}
        >
          <div>Navigating you to your cart... Please wait..</div>
          <Customer session={session} />
          <Shipping register={register} />
          <Payment register={register} Controller={Controller} control={control} />
        </Stepper>
      </div>
      <OrderSummary />
    </div>
  )
}