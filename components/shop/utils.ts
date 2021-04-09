import _ from 'lodash'

export const filterByKeyword = (search: string, source: any[], filterKeys: string[]) => {
  if(!search) {
    return source
  }

  let filtered = source.filter((f: any) => {
    let found: boolean[] = [] 
    filterKeys.forEach((key: string) => {
      let stringed = f[key] ? f[key].toString() : ""
      let trueValue = stringed ? stringed.toLowerCase() : "*"
      found.push(trueValue.includes(search.toLowerCase()))
    })
    return found.includes(true)
  })
  return filtered
}

export const filterByPrice = (query: any, source: any[]) => {
  if(!query.min_price && !query.max_price) {
    return source
  }

  let min_price = parseInt(query.min_price)
  let max_price = parseInt(query.max_price) 
  let filtered = source.filter((f: any) => {
    let sellingPrice = parseInt(f.sellingPrice)
    return sellingPrice >= min_price && sellingPrice <= max_price
  })

  return filtered
}

export const filterByCategory = (search: string[], source: any[]) => {
  if(search.length <= 0) {
    return source
  }

  let filters = search.join().toLowerCase()
  let filtered = source.filter((f: any) => {
    return filters.includes(f.category.toLowerCase())
  })

  return filtered
}

export const reconstructQuery = (query: any, forKey: string, newValue: any) => {
  let queryKeys = Object.keys(query)
  if(queryKeys.length <= 0) {
    return `${forKey}=${newValue}`
  }
  let queryString = ''
  queryKeys.forEach((key) => {
    if(forKey === 'category' && key === 'category') return 

    let ampersand = queryString ? '&' : ''
    if(key === 'category') {
      if(typeof query.category === 'string') {
        queryString = `${queryString}${ampersand}category=${query.category}`
      } else {
        query.category.forEach((cat: string) => {
          ampersand = queryString ? '&' : ''
          queryString = `${queryString}${ampersand}category=${cat}`
        })
      }
    } else {
      if(key === forKey) {
        queryString = `${queryString}${ampersand}${key}=${newValue}`
      } else {
        queryString = `${queryString}${ampersand}${key}=${query[key]}`
      }
    }
  })
  
  return queryString
}

export const arrayUnion = (arr1: any[], arr2: any[], identifier: string) => {
  const array = [...arr1, ...arr2]

  return _.uniqBy(array, identifier)  
}