import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { signIn, getSession } from 'next-auth/client'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useRouter } from 'next/router'
import { ApplicationState } from '../../redux/rootReducer'
import CartItem from './cart-item'

const drawerWidth = 500;
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    list: {
      width: 500,
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        flexShrink: 0,
      },
    },
    fullList: {
      width: 'auto',
    },
    button: {
      backgroundColor: '#15803D'
    }
  }))

interface IProps {
  toggle: () => void
}
export default function MiniCart(props: IProps) {
  const classes = useStyles()
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

  const onViewFullCart = () => {
    props.toggle()
    router.push('/cart');
  } 

  const onCheckout = () => {
    if(!session) {
      signIn()
    } else {
      router.push('/checkout');
    }
  }

  return (
    <div className={classes.list}>
      <div className="h-full max-h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
        <div className="px-4 sm:px-6 border-dotted border-b-2">
          <div className="flex items-start justify-between">
            <Button
              startIcon={<ChevronLeftIcon />}
              onClick={props.toggle}
            >
              <h2 id="slide-over-heading" className="text-sm font-medium text-gray-900">
                Keep Shopping
              </h2>
            </Button>
            <Button
              endIcon={<ChevronRightIcon />}
              onClick={onViewFullCart}
            >
              <h2 id="slide-over-heading" className="text-sm font-medium text-gray-900">
                View Full Cart
              </h2>
            </Button>
          </div>
        </div>
        <div className="mt-6 max-h-full flex-1 px-4 sm:px-6">
          <div className='flex flex-col items-center justify-center border-dotted border-b-2 pb-6'>
            <span style={{fontWeight: 700}}>Shopping Cart</span>
            <span className="text-sm">({cart.length} Items)</span>
          </div>
          <div className="flex flex-col gap-5 py-5">
            {
              cart.map((item,i) => {
                return (<CartItem key={`cart-item-${i}`} item={item} />)
              })
            }
          </div>
          <div className="mt-10">
            <Button className={classes.button} variant="contained" fullWidth={true} color="primary" onClick={onCheckout}>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}