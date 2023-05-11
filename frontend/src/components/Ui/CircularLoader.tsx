import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function CircularLoader() {
  return <CircularProgress sx={{ display: 'flex', margin: 'auto' }} color='secondary' />
}
