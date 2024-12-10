import React from 'react'
import DelhiverySetupForm from '@/views/shippers/delhiverysetup/DelhiverySetupForm'
const Delhiverysetup = ({ detail, isAddLogistic, fetchDelhivery }) => {
  return (
    <div>
      <DelhiverySetupForm detail={detail} isAddLogistic={isAddLogistic} fetchDelhivery={fetchDelhivery} />
    </div>
  )
}

export default Delhiverysetup
