import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PriceTag from './price'
import Rating from '../common/rating'

interface IProps {
  data: any
  toggle: () => void
  handleAddToCart: () => void
}
export default function ProductDetails(props: IProps) {
  const dispatch = useDispatch()
  const { data, toggle } = props 
  const [ selectedImage, setImage ] = useState(0)
  const [ quantity, setQuantity ] = useState(1)

  let imageSource = data.imageUrl ?? '/images/defaults/default-img.png'
  let images = []
  if(data.images && data.images?.length > 0) {
    imageSource = data.images[0].imageUrl
    if(data.images.length > 1) {
      images = data.images
    }
  }

  const onAddToCart = () => {
    // let cartData = { ...data, cartQuantity: quantity }
    // dispatch(addToCart(cartData))
    props.handleAddToCart()
    toggle()
  }

  const onRate = (value: number) => {

  }

  return (
    <div className="product-details grid grid-rows-1 md:grid-cols-2">
      <div className="relative product-image flex flex-row items-start gap-5 z-10">
        { data.isSoldOut && <div style={{top: 10, left: "-6.5em"}} className="sold_out_tag"><span>Sold Out</span></div> }
        <div className="image-list flex flex-col gap-3">
          {
            images.map((item: any, i: number) => {
              return (
                <div onClick={() => setImage(i)} key={`image-item-${i}`} className={`${selectedImage === i ? 'selected' : ''} image-item cursor-pointer`}>
                  <img src={item.imageUrl} alt="" />
                </div>
              )
            })
          }
        </div>
        <div className="primary-image">
          <img src={images[selectedImage]?.imageUrl ?? imageSource} alt="" />
        </div>
      </div>
      <div className="relative flex flex-col p-5 gap-2">
        <span className="text-2xl">{data.name}</span>
        <span>{data.sellingFeature}</span>
        <Rating displayOnly={true} className="text-green-500" rate={data.reviews.averageRating ?? 0} />
        <PriceTag largeDisplay={true} sellingPrice={data.sellingPrice} />
        <div className="marketing-content mt-10 mb-10">
          <p>{data.description}</p>
        </div>
        <div className="lg:absolute bottom-0 w-full">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <span className="text-sm">Rate this Product</span>
              <Rating className="text-green-500" rate={0} onRate={onRate} />
            </div>
            <div>
              {/* <span className="text-3xl font-bold">₱ {cost}</span> */}
              {/* <PriceTag largeDisplay={true} sellingPrice={data.sellingPrice} /> */}
              <div className="flex flex-row gap-3">
                <div className="quantity flex items-center justify-between">
                  <IconButton onClick={() => setQuantity(quantity-1)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <span>{quantity}</span>
                  <IconButton onClick={() => setQuantity(quantity+1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
                <Button 
                  disabled={data.isSoldOut} 
                  onClick={onAddToCart}
                  variant="contained"
                  color={"primary"}
                >Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}