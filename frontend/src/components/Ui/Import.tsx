import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import CustomDashboard from './CustomDashboard'
import { useAppSelector } from '../../hooks/reduxHook'
import ErrorAlert from './ErrorAlert'
import LinearLoader from './LinearLoader'

interface ImportProps {
  setItem: React.Dispatch<React.SetStateAction<File | null>>
}

const Import = ({ setItem }: ImportProps) => {
  const [file, setFile] = useState<File | null>(null)
  const { isError, isLoading } = useAppSelector((state) => state.journey)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setItem(file)
  }
  return (
    <CustomDashboard>
      {isError && !isLoading && <ErrorAlert message={isError.message} />}
      {isLoading && !isError && <LinearLoader />}
      <Box
        onSubmit={(e) => submitHandler(e)}
        sx={{ textAlign: 'center' }}
        visibility={isLoading ? 'hidden' : 'visible'}
        noValidate
        autoComplete='off'
        component='form'
      >
        <div style={{ marginBottom: '40px' }}>
          <label htmlFor='file'>Import: </label>
          <input type='file' name='file' id='file' onChange={(e) => onChange(e)} />
        </div>

        <Button
          sx={{ marginRight: '112px' }}
          color='secondary'
          type='submit'
          variant='contained'
          size='small'
        >
          Save
        </Button>
      </Box>
    </CustomDashboard>
  )
}

export default Import
