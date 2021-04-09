export const addToCart = (data: any) => {
  let storedCart = localStorage.getItem('cart') 
  let cart = storedCart ? JSON.parse(storedCart) : []
  cart.push(data)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (data: any) => {
  let storedCart = localStorage.getItem('cart') 
  let cart = storedCart ? JSON.parse(storedCart) : []
  cart = cart.filter((f: any) => f.productId !== data.productId)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const updateCart = (data: any) => {
  let storedCart = localStorage.getItem('cart') 
  let cart = storedCart ? JSON.parse(storedCart) : []
  cart = [...cart, data]
  localStorage.setItem('cart', JSON.stringify(cart))
}