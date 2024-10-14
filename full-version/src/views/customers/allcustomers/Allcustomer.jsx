import React from 'react'
import CustomerTableList from '@/views/customers/allCustomers/CustomerTableList'
export default function Allcustomer({
  customerData,
  limit,
  totalPages,
  handlePageChange,
  currentPage,
  handleLimitChange,
  totalCustomer
}) {
  console.log('api se aaya hua data', customerData)
  const tableData = customerData.map(customer => ({
    customerId: customer.customer_id,
    fullName: `${customer.firstname} ${customer.lastname}`,
    email: customer.email,
    contact: customer.phone,
    city: customer.default_address?.city,
    state: customer.default_address?.state,
    status: customer.status ? 'active' : 'inactive',
    avatar: customer.profile_image,
    avatarColor: 'primary',
    id: customer._id
  }))

  // const totalCustomer = CustomerData.customerCount
  console.log('mein to table data hu na customer me', tableData)
  return (
    <div>
      <CustomerTableList
        tableData={tableData}
        totalCustomer={totalCustomer}
        limit={limit}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  )
}
