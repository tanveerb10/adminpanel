import React from 'react'
import CouponTableList from '@/views/offers/allcoupons/CouponTableList'
import { Chip } from '@mui/material'
const AllCoupons = ({ couponsData }) => {
  function formatDate(RawTime) {
    const dates = new Date(RawTime)
    const date = ` ${dates.getDate()}/${dates.getMonth() + 1}/${dates.getFullYear()}`
    const time = `${dates.getHours() % 12 || 12}-${dates.getMinutes()}-${dates.getSeconds()} ${dates.getHours() >= 12 ? 'PM' : 'AM'}`
    return (
      <div className='flex gap-2 flex-col justify-center items-center'>
        <Chip label={time} />
        <Chip label={date} />
      </div>
    )
  }
  const tableData = couponsData.Coupon.map((coupon, index) => ({
    name: coupon.coupon_name,
    description: coupon.coupon_description,
    couponCount: coupon.coupon_count,
    status: coupon.status,
    code: coupon.coupon_code,
    type: coupon.discount_type,
    id: coupon._id,
    validity: formatDate(coupon.valid_to),
    mov: coupon.min_order_value,
    discountValue: coupon.discount_value,
    index: index + 1
  }))

  console.log(tableData)

  const totalCoupons = couponsData.couponCount

  return (
    <div>
      <CouponTableList tableData={tableData} totalCoupons={totalCoupons} />
    </div>
  )
}

export default AllCoupons
