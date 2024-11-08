import React from 'react'

import Header from './Header'
import ProductList from './ProductList'
import HomeChartSidebar from './HomeChartSidebar'
import NewShipment from './NewShipment'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Home = () => {
    const [shipmentsData, setShipmentsData] = useState();
    const [open,setOpen] = useState(false);
    useEffect(() => {
        /* Function for fetching data from api */
        const fetchShipmentData = async () => {

            fetch('http://localhost:3000/shipments', { method: 'GET' })
                .then(res => res.json())
                .then(r => {
                    console.log(r);
                    setShipmentsData(r.Data);
                })
                .catch(e => console.log(e));


        }

        fetchShipmentData();
    }, []);

    const handleNewShipmentOpen = () => { 
        setOpen(true);
     }
    const handleNewShipemntClose = () => { 
        setOpen(false);
     } 
    return (
        <>
        <NewShipment open={open} onClose={handleNewShipemntClose}/>
            <div className=' flex'>
                <Navbar onOpen={handleNewShipmentOpen} open={open}/>
                <div id='left-home' className='mt-2'> <Header totalShipments={shipmentsData && shipmentsData.length} />
                    <div className='flex flex-row justify-evenly'>

                        {shipmentsData && <HomeChartSidebar data={shipmentsData} />}
                    </div>

                    {shipmentsData && <ProductList data={shipmentsData} />}

                </div>

            </div>

        </>
    )
}

export default Home