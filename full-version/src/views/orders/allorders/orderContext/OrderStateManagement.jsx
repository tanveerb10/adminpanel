import { createContext, useContext, useMemo, useState } from 'react'

const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [customerAddress, setCustomerAddress] = useState({})
  const [productTotal, setProductTotal] = useState(0)
  const [note, setNote] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [ipAddress, setIpAddress] = useState('')

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

  const addOrderForProduct = (parentId, variations, product, variation) => {
    const selectedVariants = variations.map(variationId => {
      return {
        variationName: [
          variation.variation1?.variation_option_value,
          variation.variation2?.variation_option_value,
          variation.variation3?.variation_option_value
        ]
          .filter(Boolean)
          .join('/'),
        variationId: variation._id,
        price: variation.variation_selling_price,
        available: variation.variation_quantity,
        productId: parentId,
        productTitle: product.product_title
      }
    })

    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders, ...selectedVariants]
      return updatedOrders
    })
  }

  // Remove all orders for a particular product
  const removeOrderForProduct = parentId => {
    setOrders(prevOrders => prevOrders.filter(order => order.productId !== parentId))
  }

  // Add a variant order
  const addOrderForVariant = ({ parentId, variantId, product, variant }) => {
    const existingOrder = orders.find(order => order.variationId === variantId)

    if (!existingOrder) {
      setOrders(prevOrders => [
        ...prevOrders,
        {
          productId: parentId,
          variationId: variantId,
          productTitle: product.product_title,
          variationName: [
            variant.variation1?.variation_option_value,
            variant.variation2?.variation_option_value,
            variant.variation3?.variation_option_value
          ]
            .filter(Boolean)
            .join('/'),
          price: variant.variation_selling_price,
          quantity: 1,
          available: variant.variation_quantity,
          totalPrice: variant.variation_selling_price
        }
      ])
    } else {
      console.warn('Order for this variant already exists.')
    }
  }

  // Remove a variant order
  const removeOrderForVariant = (parentId, variantId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.variationId !== variantId))
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

  const totalQuantity = useMemo(() => orders.reduce((acc, curr) => acc + curr.quantity, 0), [orders])

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

  const handleIp = ip => {
    setIpAddress(ip)
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
    paymentMethod,
    addOrderForProduct,
    addOrderForVariant,
    removeOrderForProduct,
    removeOrderForVariant,
    totalQuantity,
    handleIp,
    ipAddress
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
