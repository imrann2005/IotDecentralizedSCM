import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import ProductList from './components/ProductList'
import HomeChartSidebar from './components/HomeChartSidebar'

function App() {
  const [shipmentsData, setShipmentsData] = useState();
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
  return (
    <>
      <div className=' flex'>
        <Navbar />
        <div id='left-home' className='mt-2'> <Header totalShipments={shipmentsData && shipmentsData.length}/>
          <div className='flex flex-row justify-evenly'>
           
            {shipmentsData && <HomeChartSidebar data={shipmentsData} />}
          </div>

          {shipmentsData && <ProductList data={shipmentsData} />}

        </div>

      </div>


    </>
  )
}

export default App
