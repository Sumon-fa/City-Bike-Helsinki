import React, { useEffect } from 'react'
import { useAppDispatch } from './hooks/reduxHook'
import { getAllJourneys } from './redux/methods/journeyMethods'
import Navbar from './components/Header/Navbar'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const filter = {
      title: '',
      pageNumber: 1,
    }
    dispatch(getAllJourneys(filter))
  }, [])

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App
