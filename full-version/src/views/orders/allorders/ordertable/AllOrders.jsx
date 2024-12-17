import React from 'react'

import OrderTableList from '@views/orders/allorders/ordertable/OrderTableList'
import { Chip } from '@mui/material'
const AllOrders = ({
  orders,
  limit,
  totalPages,
  handlePageChange,
  handleLimitChange,
  currentPage,
  totalOrders,
  handleSearch,
  value,
  setValue,
  resetFilter,
  handleSorting,
  sortMethod,
  selectStatus,
  handleSelectStatus,
  isSortingActive
}) => {
  function formatDate(RawTime) {
    const dates = new Date(RawTime)
    const date = ` ${dates.getDate()}/${dates.getMonth() + 1}/${dates.getFullYear()}`

    return (
      <div className='flex gap-2 justify-center items-center'>
        <Chip label={date} />
      </div>
    )
  }
  const tableData = orders?.map((order, index) => ({
    id: order._id,
    fullName: `${order.customerId.firstname} ${order.customerId.lastname}`,
    email: order.customerId.email,
    channel: order.orderSource,
    orderStatus: order.orderStatus.order_status,
    orderDate: formatDate(order.orderDate),
    fulfillmentStatus: order.fulfilmentStatus,
    financialStatus: order.financialStatus,
    orderTotal: order.orderTotal,
    orderId: order.orderId,
    orderItem: order.orderItem
  }))

  console.log(tableData)

  return (
    <div>
      <OrderTableList
        tableData={tableData}
        limit={limit}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        currentPage={currentPage}
        totalOrders={totalOrders}
        handleSearch={handleSearch}
        value={value}
        setValue={setValue}
        resetFilter={resetFilter}
        handleSorting={handleSorting}
        sortMethod={sortMethod}
        selectStatus={selectStatus}
        handleSelectStatus={handleSelectStatus}
        isSortingActive={isSortingActive}
      />
    </div>
  )
}

export default AllOrders
