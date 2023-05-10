import React from 'react'
import Navbar from './components/Header/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import AllStations from './components/Station/AllStation/AllStations'
import StationDetails from './components/Station/SingleStation/StationDetails'
import AllJourney from './components/Journey/AllJourney/AllJourneys'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllJourney />} />
        <Route path='/stations' element={<AllStations />} />
        <Route path='/station/:id' element={<StationDetails />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/import/journey' element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
