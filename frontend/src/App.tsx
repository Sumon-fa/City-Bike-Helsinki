import React from 'react'
import Navbar from './components/Header/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import AllStations from './components/Station/All/AllStations'
import StationDetails from './components/Station/Details/StationDetails'
import AllJourney from './components/Journey/All/AllJourneys'
import Dashboard from './components/Dashboard/Dashboard'
import NewJourney from './components/Dashboard/Journey/New/NewJourney'
import ImportJorney from './components/Dashboard/Journey/Import/ImportJorney'

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
        <Route path='/dashboard/journey/import' element={<ImportJorney />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
