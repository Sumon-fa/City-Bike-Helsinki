import React from 'react'
import Navbar from './components/Header/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import AllJourney from './pages/Journey/All/AllJourneys'
import AllStations from './pages/Station/All/AllStations'
import StationDetails from './pages/Station/Details/StationDetails'
import Dashboard from './pages/Dashboard/Dashboard'
import NewJourney from './pages/Dashboard/Journey/New/NewJourney'
import NewStation from './pages/Dashboard/Station/New/NewStation'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllJourney />} />
        <Route path='/stations' element={<AllStations />} />
        <Route path='/station/:id' element={<StationDetails />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/journey/new' element={<NewJourney />} />
        <Route path='/dashboard/station/new' element={<NewStation />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
