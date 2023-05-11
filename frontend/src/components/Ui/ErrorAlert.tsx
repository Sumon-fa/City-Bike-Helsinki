import { Alert } from '@mui/material'
import React from 'react'

interface ErrorProps {
  message: string
}

const ErrorAlert = ({ message }: ErrorProps) => {
  return (
    <Alert sx={{ display: 'flex', margin: 'auto auto 22px auto', width: '50%' }} severity='error'>
      {message}
    </Alert>
  )
}

export default ErrorAlert
