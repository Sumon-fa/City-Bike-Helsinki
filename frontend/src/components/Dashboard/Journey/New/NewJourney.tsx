import React, { useState } from 'react'
import CustomDashboard from '../../../Ui/CustomDashboard'
import TextField from '@mui/material/TextField'
import { Box, Button, Grid, InputLabel, Paper, Typography } from '@mui/material'
import { useAppDispatch } from '../../../../hooks/reduxHook'
import { newJourney } from '../../../../redux/methods/journeyMethods'

const NewJourney = () => {
  const [departure, setDeparture] = useState('')
  const [departureStationId, setDepartureStationId] = useState('')
  const [departureStationName, setDepartureStationName] = useState('')
  const [back, setBack] = useState('')
  const [returnStationId, setReturnStationId] = useState('')
  const [returnStationName, setReturnStationName] = useState('')
  const [coveredDistance, setCoveredDistance] = useState(0)
  const [duration, setDuration] = useState(0)

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
                value={coveredDistance}
                onChange={(e) => setCoveredDistance(parseFloat(e.target.value))}
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
                type='number'
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
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
              <Button type='submit' variant='contained' sx={{ color: '#ff781f' }}>
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
