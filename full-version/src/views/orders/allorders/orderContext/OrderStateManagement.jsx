import { createContext, useContext, useMemo, useState } from 'react'

const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [customerAddress, setCustomerAddress] = useState({})
  const [productTotal, setProductTotal] = useState(0)
  console.log('orders', orders)
  const addOrder = neworder => {
    console.log('new order', neworder, 'new order')

    setOrders(prevOrders => {
      const existingIds = new Set(prevOrders.map(order => order.variationId))
      const uniqueOrders = neworder.filter(order => !existingIds.has(order.variationId))
      return [...prevOrders, ...uniqueOrders]
    })
  }

  const removeOrder = orderId => {
    setOrders(prevOrders => prevOrders.filter(item => item.variationId !== orderId))
  }

  const addCustomerAddress = address => {
    setCustomerAddress(address)
  }

  const removeCustomerAddress = () => {
    setCustomerAddress({})
  }

  const handleProductTotal = total => {
    setProductTotal(total)
  }

  const updateQuantity = (variationId, quantity) => {
    setOrders(prev =>
      prev.map(order =>
        order.variationId === variationId ? { ...order, quantity, totalPrice: order.price * quantity } : order
      )
    )
  }

  const grandTotal = useMemo(() => orders.reduce((acc, o) => acc + o.totalPrice, 0), [orders])

  const handleAllReset = () => {
    setOrders([])
    setCustomerAddress({})
    setProductTotal(0)
  }
  const value = {
    orders,
    addOrder,
    removeOrder,
    addCustomerAddress,
    removeCustomerAddress,
    customerAddress,
    productTotal,
    handleProductTotal,
    handleAllReset,
    setOrders,
    updateQuantity,
    grandTotal
  }
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("'useOrder must be used within a Order Provider")
  }
  return context
}
