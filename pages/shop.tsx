import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { ApplicationState } from '../redux/rootReducer'
import { getProducts } from '../redux/products/actions'
import ProductCard from '../components/shop/product-card'
import ProductSkeleton from '../components/shop/skeleton'
import ProductError from '../components/shop/error-message'
import { ProductDetailKeys } from '../components/shop/constants'
// import MobileFilters from '../components/shop/mobile-filter'
import { filterByKeyword, filterByPrice, filterByCategory, arrayUnion } from '../components/shop/utils'

interface IProps {
  category?: string
}
export default function Shop(props: IProps) {
  const { category } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const loading = useSelector((state: ApplicationState) => state.products.processing)
  const error = useSelector((state: ApplicationState) => state.products.error)
  const products = useSelector((state: ApplicationState) => state.products.data)
  const [ list, setList ] = useState(products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    if(category && products.length > 0) {
      let byCategory = filterByCategory([category], products)
      setList(byCategory)
    } 
  }, [category, products])

  useEffect(() => {
    if(products.length > 0 && !category) {
      setList(products)
      if(router.query) {
        let search = router.query.search as string
        let byKeyword = search ? filterByKeyword(search, products, ProductDetailKeys) : []
        let hasCategoryFilter = false
        let catSearch: string[] = []
        if(router.query.category) {
          hasCategoryFilter = true
          if(typeof router.query.category === 'string') {
            catSearch = [router.query.category]
          } else {
            catSearch = router.query.category
          }
        }
        let byCategory = hasCategoryFilter ? filterByCategory(catSearch, products) : []
        let results1 = arrayUnion(byKeyword, byCategory, 'productId')

        let byPrice = filterByPrice(router.query, products)
        let filtered = results1.length > 0 ? _.intersectionBy(results1, byPrice, 'productId') : byPrice
        setList(filtered)
      }
    }
  }, [products, router.query])
  
  return (
    <div className="shop-page bg-gray-100 h-full p-10">
      <div className="content">
        <div className="products flex flex-row flex-wrap gap-10 justify-center">
        {
          (loading && products.length <= 0) && [0, 1, 2].map((item) => {
            return <ProductSkeleton key={`product-skeleton-${item}`} />
          })
        }
        { (!loading && error) &&  <ProductError error={error} />}
        {
          list.map((item) => {
            return (
              <ProductCard
                key={item.productId}
                data={item}
              />
            )
          })
        }
        </div>
      </div>
    </div>
  )
}