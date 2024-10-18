import React from 'react'
import CustomerAddressTableList from '@/views/customers/allcustomers/customerAddress/CustomerAddressTableList'
export default function AllCustomerAddress({
  customerAddressData,
  limit,
  totalPages,
  handlePageChange,
  currentPage,
  handleLimitChange,
  customerAddressCount
}) {
  console.log('customer address api se ', customerAddressData)
  const tableData = customerAddressData?.map((customer, ind) => ({
    customerId: ind + 1,
    fullName: `${customer?.default_address?.firstname} ${customer?.default_address?.lastname}`,
    email: customer?.email || 'Not Set',
    contact: customer?.default_address?.phone || 'Not Set',
    city: customer?.default_address?.city || 'Not Set',
    state: customer?.default_address?.state || 'Not Set',
    pin: customer?.default_address?.pin || 'Not Set',
    country: customer?.default_address?.country || 'Not Set',

    id: customer.customer_id
  }))

  // const totalCustomer = CustomerData.customerCount
  console.log('mein to table data hu na customer me', tableData)
  return (
    <div>
      <CustomerAddressTableList
        tableData={tableData}
        totalCustomerAddress={customerAddressCount}
        limit={limit}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  )
}
