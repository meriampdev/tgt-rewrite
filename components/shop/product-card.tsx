import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cart/actions'
import ProductDetails from './product-details'
import PriceTag from './price'
import Dialog from '../common/dialog'
import Rating from '../common/rating'
import AddToCartToast from '../cart/add-to-cart-toast'

interface IProps {
  data: any
}
export default function ProductCard(props: IProps) {
  const dispatch = useDispatch()
  const [ showModal, setModal ] = useState(false)
  const { data } = props 
  let imageSource = data.imageUrl ?? '/images/defaults/default-img.png'
  if(data.images && data.images?.length > 0) {
    imageSource = data.images[0].imageUrl
  }

  const handleAddToCart = () => {
    toast.dismiss()
    toast(<AddToCartToast item={data} />,{
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    let cartData = { ...data, cartQuantity: 1 }
    dispatch(addToCart(cartData))
  }

  const toggle = () => {
    setModal(!showModal)
  }

  
  return (
    <div className="product-card flex flex-col p-5 text-green-900">
      <div onClick={toggle} className={`product-image relative cursor-pointer`}>
        { data.isSoldOut && <div className="sold_out_tag"><span>Sold Out</span></div> }
        <img className="h-full w-full object-contain" src={imageSource} alt="" />
      </div>
      <div className="product-name flex flex-row gap-4 items-center justify-between mt-3">
        <span className="text-xs">{data.name}</span>
        <div>
          <Tooltip title="Add to Cart">
            <span>
              <IconButton disabled={data.isSoldOut} name="shopping-cart" onClick={handleAddToCart}>
                <AddShoppingCartOutlinedIcon className={ !data.isSoldOut ? "text-orange-500" : ""} fontSize="large" />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="product-price flex flex-row justify-between mt-3">
        <PriceTag sellingPrice={data.sellingPrice} />
        <div className="product-rating">
          <Rating displayOnly={true} disabled={true} size="small" className="text-orange-400" rate={data.reviews.averageRating ?? 0} />
        </div>
      </div>
      <Dialog open={showModal} onClose={toggle}>
        <ProductDetails 
          handleAddToCart={handleAddToCart}
          toggle={toggle}
          data={data} 
        />
      </Dialog>
    </div>
  )
}