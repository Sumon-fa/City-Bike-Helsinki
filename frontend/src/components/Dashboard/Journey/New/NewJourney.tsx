import React, { useState } from 'react'
import CustomDashboard from '../../../Ui/CustomDashboard'
import TextField from '@mui/material/TextField'
import { Box, Button, Grid, InputLabel, Paper, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { newJourney } from '../../../../redux/methods/journeyMethods'
import ErrorAlert from '../../../Ui/ErrorAlert'

const NewJourney = () => {
  const [departure, setDeparture] = useState('')
  const [departureStationId, setDepartureStationId] = useState('')
  const [departureStationName, setDepartureStationName] = useState('')
  const [back, setBack] = useState('')
  const [returnStationId, setReturnStationId] = useState('')
  const [returnStationName, setReturnStationName] = useState('')
  const [coveredDistance, setCoveredDistance] = useState(0)
  const [duration, setDuration] = useState(0)

  const { isError, isLoading } = useAppSelector((state) => state.journey)
  const dispatch = useAppDispatch()

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      departure,
      departureStationId,
      departureStationName,
      return: back,
      returnStationId,
      returnStationName,
      coveredDistance,
      duration,
    }
    dispatch(newJourney(data))
  }

  return (
    <CustomDashboard>
      {isError && !isLoading && <ErrorAlert message={isError.message} />}
      <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
        <Box
          onSubmit={(e) => submitHandler(e)}
          sx={{ padding: 5 }}
          noValidate
          autoComplete='off'
          component='form'
        >
          <Typography variant='h6' gutterBottom sx={{ paddingBottom: 5 }}>
            New Journey
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Departure
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='departure'
                name='departure'
                fullWidth
                size='small'
                variant='outlined'
                type='datetime-local'
                color='secondary'
                value={departure}
                onChange={(e) =>
                  setDeparture(new Date(e.target.value).toISOString().replace('Z', ''))
                }
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Id
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id='departureStationId'
                name='departureStationId'
                label='Departure Station Id'
                size='small'
                variant='outlined'
                color='secondary'
                required
                fullWidth
                value={departureStationId}
                onChange={(e) => setDepartureStationId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Name
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='departureStationName'
                name='departureStationName'
                label='Departure Station Name'
                fullWidth
                color='secondary'
                size='small'
                variant='outlined'
                value={departureStationName}
                onChange={(e) => setDepartureStationName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Return
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='back'
                name='back'
                fullWidth
                size='small'
                variant='outlined'
                type='datetime-local'
                color='secondary'
                value={back}
                onChange={(e) => setBack(new Date(e.target.value).toISOString().replace('Z', ''))}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Id
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id='returnStationId'
                name='returnStationId'
                label='Return Station Id'
                size='small'
                variant='outlined'
                color='secondary'
                required
                fullWidth
                value={returnStationId}
                onChange={(e) => setReturnStationId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Name
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='returnStationName'
                name='returnStationName'
                label='Return Station Name'
                fullWidth
                size='small'
                variant='outlined'
                color='secondary'
                value={returnStationName}
                onChange={(e) => setReturnStationName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Distance
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id='coveredDistance'
                name='coveredDistance'
                label='Covered Distance (m)'
                size='small'
                variant='outlined'
                type='number'
                color='secondary'
                value={coveredDistance}
                onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  if (!isNaN(value)) {
                    setCoveredDistance(value)
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Duration
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id='duration'
                name='duration'
                label='Duration (sec.)'
                size='small'
                variant='outlined'
                color='secondary'
                type='number'
                value={duration}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  if (!isNaN(value)) {
                    setDuration(value)
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              ></InputLabel>
            </Grid>

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button type='submit' color='secondary' variant='contained'>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </CustomDashboard>
  )
}

export default NewJourney
