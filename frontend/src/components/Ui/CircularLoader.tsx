import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function CircularLoader() {
  return <CircularProgress sx={{ display: 'flex', margin: 'auto' }} color='secondary' />
}
