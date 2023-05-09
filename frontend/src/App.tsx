import React from 'react'
import Navbar from './components/Header/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import AllStations from './components/Station/AllStation/AllStations'
import StationDetails from './components/Station/StationDetails'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stations' element={<AllStations />} />
        <Route path='/station/:id' element={<StationDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
