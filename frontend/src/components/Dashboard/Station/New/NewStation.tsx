import React, { useState } from 'react'
import CustomDashboard from '../../../Ui/CustomDashboard'
import TextField from '@mui/material/TextField'
import { Box, Button, Grid, InputLabel, Paper, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { newStation } from '../../../../redux/methods/stationMethods'
import ErrorAlert from '../../../Ui/ErrorAlert'

const NewStation = () => {
  const [id, setId] = useState('')
  const [nimi, setNimi] = useState('')
  const [namn, setNamn] = useState('')
  const [name, setName] = useState('')
  const [osoite, setOsoite] = useState('')
  const [adress, setAdress] = useState('')
  const [kaupunki, setKaupunki] = useState('')
  const [stad, setStad] = useState('')
  const [operaattor, setOperattor] = useState('')
  const [kapasiteet, setKapasiteet] = useState(0)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const { isError, isLoading } = useAppSelector((state) => state.station)
  const dispatch = useAppDispatch()

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      id,
      nimi,
      namn,
      name,
      osoite,
      adress,
      kaupunki,
      stad,
      operaattor,
      kapasiteet,
      x,
      y,
    }
    dispatch(newStation(data))
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
            New Station
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
                Id
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='id'
                name='id'
                fullWidth
                size='small'
                variant='outlined'
                color='secondary'
                value={id}
                onChange={(e) => setId(e.target.value)}
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
                Nimi
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id='nimi'
                name='nimi'
                label='Nimi'
                size='small'
                variant='outlined'
                color='secondary'
                required
                fullWidth
                value={nimi}
                onChange={(e) => setNimi(e.target.value)}
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
                Namn
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='namn'
                name='namn'
                label='Namn'
                color='secondary'
                fullWidth
                size='small'
                variant='outlined'
                value={namn}
                onChange={(e) => setNamn(e.target.value)}
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
                id='name'
                name='name'
                fullWidth
                color='secondary'
                size='small'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                Osoite
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id='osoite'
                name='osoite'
                label='Osoite'
                size='small'
                color='secondary'
                variant='outlined'
                required
                fullWidth
                value={osoite}
                onChange={(e) => setOsoite(e.target.value)}
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
                Adress
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='adress'
                name='adress'
                label='Adress'
                fullWidth
                color='secondary'
                size='small'
                variant='outlined'
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
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
                Kaupunki
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='kaupunki'
                name='kaupunki'
                label='Kaupunki'
                fullWidth
                size='small'
                color='secondary'
                variant='outlined'
                value={kaupunki}
                onChange={(e) => setKaupunki(e.target.value)}
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
                Stad
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='stad'
                name='stad'
                label='Stad'
                fullWidth
                size='small'
                variant='outlined'
                color='secondary'
                value={stad}
                onChange={(e) => setStad(e.target.value)}
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
                Operaattor
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id='operaattor'
                name='operaator'
                label='Operaattor'
                color='secondary'
                fullWidth
                size='small'
                variant='outlined'
                value={operaattor}
                onChange={(e) => setOperattor(e.target.value)}
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
                Kapasiteet
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id='kapasiteet'
                name='kapasiteet'
                label='Kapasiteet'
                size='small'
                variant='outlined'
                color='secondary'
                type='number'
                value={kapasiteet}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  if (!isNaN(value)) {
                    setKapasiteet(value)
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
                X
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id='x'
                name='x'
                label='X'
                size='small'
                variant='outlined'
                color='secondary'
                type='number'
                value={x}
                onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  if (!isNaN(value)) {
                    setX(value)
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
                Y
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id='y'
                name='y'
                label='Y'
                size='small'
                color='secondary'
                variant='outlined'
                type='number'
                value={y}
                onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  if (!isNaN(value)) {
                    setY(value)
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button type='submit' variant='contained' color='secondary'>
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

export default NewStation
