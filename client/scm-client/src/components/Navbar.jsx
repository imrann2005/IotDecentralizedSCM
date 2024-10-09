import React from 'react'
import Button from '@mui/material/Button';

const Navbar = () => {
    return (
        <nav className='h-[full] w-1/6 bg-[#292929] flex flex-col items-center text-[#ffffff] sticky'>
            <h1 className='poppins-bold text-lg text-[#ffffff] mx-auto py-4 text-center'>SupplySync</h1>
            <ul className='text-left poppins-regular mx-auto my-2 text-md p-2 gap-3 flex flex-col'>
                <li className=' hover:underline hover:font-medium hover:cursor-pointer'>
                    <Button  variant='contained' sx={{
                          width : '85%',
                        backgroundColor: '#ffffff',
                        color: '#292929',
                        textAlign: 'center',
                        margin: '2px   '
                    }}>
                        Home
                    </Button>
                </li>
                <li className=' hover:underline hover:font-medium hover:cursor-pointer'>
                    <Button variant='contained' sx={{
                        width : '85%',
                        backgroundColor: '#292929',
                        color: '#ffffff',
                        textAlign: 'center'
                    }}>
                        New Shipment
                    </Button>
                </li>
                <li className=' hover:underline hover:font-medium hover:cursor-pointer'>
                    <Button variant='contained' sx={{
                          width : '85%',
                        backgroundColor: '#292929',
                        color: '#ffffff',
                        textAlign: 'center'
                    }}>
                        History
                    </Button>
                </li>
                <li className=' hover:underline hover:font-medium hover:cursor-pointer'>
                    <Button  className='hover:font-medium hover:cursor-pointer' sx={{
                        width : '85%',
                        backgroundColor: '#292929',
                        color: '#ffffff',
                        textAlign: 'center'
                    }}>
                        About
                    </Button>
                </li>
                <li className=' hover:underline hover:font-medium hover:cursor-pointer'>
                    <Button  className='hover:font-medium hover:cursor-pointer' sx={{
                        width : '85%',
                        backgroundColor: '#292929',
                        color: '#ffffff',
                        textAlign: 'center'
                    }}>
                        Logout
                    </Button>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar