import React from 'react'
import { useLocation } from 'react-router-dom'

import { AppBar, Typography } from '@mui/material'

const Footer = () => {
  const { pathname } = useLocation()
  return (
    <>
      {pathname.startsWith('/dashboard') ? null : (
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
