import { createContext, useContext, useMemo, useState } from 'react'

const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [customerAddress, setCustomerAddress] = useState({})
  const [productTotal, setProductTotal] = useState(0)
  const [note, setNote] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleWordCount = newNote => {
    if (/^\s*$/.test(newNote)) {
      return
    }
    const words = newNote.trim().length

    if (words <= 5000) {
      setNote(newNote)
      setWordCount(words)
    }
  }

  console.log('orders', orders)
  const addOrder = neworder => {
    console.log('new order', neworder, 'new order')

    setOrders(prevOrders => {
      const existingIds = new Set(prevOrders.map(order => order.variationId))
      const updatedOrders = neworder
        .filter(order => !existingIds.has(order.variationId))
        .map(order => ({ ...order, quantity: 1, totalPrice: order.price * 1 }))
      return [...prevOrders, ...updatedOrders]
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
        order.variationId === variationId
          ? {
              ...order,
              quantity: Math.max(0, Math.min(quantity, order.available)),
              totalPrice: order.price * Math.max(0, Math.min(quantity, order.available))
            }
          : order
      )
    )
  }

  const grandTotal = useMemo(() => orders.reduce((acc, o) => acc + o.totalPrice, 0), [orders])

  const handleAllReset = () => {
    setOrders([])
    setCustomerAddress({})
    setProductTotal(0)
    setNote('')
    setWordCount(0)
  }

  const handlePaymentMethod = value => {
    setPaymentMethod(value)
    console.log('Selected Payment Method:', value)
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
    grandTotal,
    wordCount,
    handleWordCount,
    note,
    handlePaymentMethod,
    paymentMethod
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
