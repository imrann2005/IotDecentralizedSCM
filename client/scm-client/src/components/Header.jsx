import React from 'react'

const Header = ({totalShipments}) => {
  const currDate = new Date().toLocaleString();
  return (
    <div className='flex flex-row items-center justify-between mx-4 my-4 px-3 py-2 shadow-lg border-b-gray-200 rounded-sm '>
      <div>
        <h2 className='text-[#000000] text-lg poppins-semibold'>
          Welcome, Admin
        </h2>

        <p className='text-[#676161] text-sm'>{currDate}</p>
      </div>
      <div>
        <h4 className='text-[#000000] text-md poppins-semibold'>
          Total Shipments
        </h4>

        <p className='text-[#676161] text-sm text-center'>{totalShipments}</p>
      </div>
    </div>
  )
}

export default Header