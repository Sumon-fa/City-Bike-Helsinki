import React from 'react'
import { AppBar, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/dashboard' && (
        <AppBar position='static' color='secondary' sx={{ height: '7rem', marginTop: 'auto' }}>
          <Typography variant='h4' color='primary' sx={{ margin: 'auto' }}>
            City Bike
          </Typography>
        </AppBar>
      )}
    </>
  )
}

export default Footer
