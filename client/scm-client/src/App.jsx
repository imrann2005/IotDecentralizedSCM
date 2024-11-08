import React from 'react'
import './App.css'

import { FormProvider } from './contexts/FormContext'

import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NewShipment from './components/NewShipment'

function App() {

  return (
    <>
      <FormProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/new' element={<NewShipment open={true} onClose={close}/>} /> */}
        </Routes>
      </FormProvider>

    </>
  )
}

export default App
