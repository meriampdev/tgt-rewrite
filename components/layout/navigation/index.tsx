import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../redux/rootReducer'
import { getProductCategories } from '../../../redux/products/actions'
import { navPaths } from './constants'

export default function Navigation() {
  const dispatch = useDispatch()
  const categories = useSelector((state: ApplicationState) => state.products.categories)

  useEffect(() => {
    dispatch(getProductCategories())
  }, [])

  return (
    <div className="navigation hidden md:flex items-center justify-center pt-5">
      {
        categories.map((cat) => {
          if(!navPaths[cat.lookupValue]) return null
          return (
            <Link key={navPaths[cat.lookupValue].path} href={navPaths[cat.lookupValue].path}>
              <div className='cursor-pointer nav-item flex flex-row items-center text-sm gap-2 px-5 text-white hover:text-yellow-300'>
                <span className="text-base">{navPaths[cat.lookupValue].text}</span>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}