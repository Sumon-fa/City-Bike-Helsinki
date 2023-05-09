import React from 'react'
import Navbar from './components/Header/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import AllStations from './components/Station/AllStation/AllStations'

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stations' element={<AllStations />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
