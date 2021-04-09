import Skeleton from '../common/skeleton'

export default function ProductSkeleton() {
  return (
    <div className="product-card flex flex-col p-5">
      <Skeleton width="100%" height={"300px"} style={{paddingBottom: 5}} />
      <div className="product-name flex flex-row justify-between mt-3">
        <Skeleton width="60%" height={"20px"} />
        <div>
          <Skeleton width="20px" height={"20px"} style={{borderRadius: '50%', marginRight: 3}} />
          <Skeleton width="20px" height={"20px"} style={{borderRadius: '50%'}} />
        </div>
      </div>
      <div className="product-price flex flex-row justify-between">
        <Skeleton width="30%" height={"20px"} />
        <div className="product-rating">
          <Skeleton width="100%" height={"20px"} />
        </div>
      </div>
    </div>
  )
}