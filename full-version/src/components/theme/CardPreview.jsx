import * as React from 'react'

// Next Imports
import Image from 'next/image'

export default function CardPreview({ color, fontSelect, titleColor, bodyColor }) {
  return (
    <div>
      <div className='flex justify-center item-center'>
        <Image width='100' height='70' src='/images/cards/1.png' alt='green iguana' />
      </div>
      <p className='text-[14px] mt-1' style={{ fontFamily: fontSelect, color: bodyColor }}>
        Lorem ipsum dolor sit amet consectetur,
      </p>
      <div className='flex justify-between mt-2'>
        <div>
          <p className='text-[11px] text-[#aaaaaa]' style={{ fontFamily: fontSelect, color: bodyColor }}>
            Shirt Branded
          </p>
          <p className='text-[13px]' style={{ fontFamily: fontSelect, color: bodyColor }}>
            Rs. 650
          </p>
        </div>

        <div className='mt-2 mr-2'>
          <button
            className='p-1 rounded-lg cursor-pointer text-[12px]'
            style={{ backgroundColor: color, fontFamily: fontSelect, color: bodyColor }}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  )
}
