import React from 'react'
import { AppBar, Typography } from '@mui/material'

const Footer = () => {
  return (
    <AppBar position='static' color='secondary' sx={{ height: '10rem' }}>
      <Typography variant='h4' color='primary' sx={{ margin: 'auto' }}>
        City Bike
      </Typography>
    </AppBar>
  )
}

export default Footer
