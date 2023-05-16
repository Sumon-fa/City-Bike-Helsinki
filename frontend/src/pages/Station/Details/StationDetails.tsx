import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import { Container, Link, TableContainer, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook'
import { getStationDetails } from '../../../redux/methods/stationMethods'
import { useParams } from 'react-router-dom'
import { StyledTableRow, StyledTableCell } from '../../../components/Ui/tableStyles'
import theme from '../../../components/Ui/theme'

function StationDetails() {
  const { station } = useAppSelector((state) => state.station)
  const dispatch = useAppDispatch()

  const params = useParams()

  useEffect(() => {
    dispatch(getStationDetails(Number(params.id)))
  }, [params.id])

  return (
    <Container
      sx={{
        marginTop: 'auto',
        [theme.breakpoints.up('sm')]: {
          width: '60%',
        },
      }}
    >
      <Typography
        variant='h4'
        color='secondary'
        sx={{
          textAlign: 'center',
          marginBottom: '11%',
          fontSize: '2rem',
          fontWeight: 600,
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
          },
        }}
      >
        Station
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          display: 'flex',
          margin: 'auto',
          width: 'max-content',
          overflow: 'hidden',
          [theme.breakpoints.down('sm')]: {
            width: '350px',
            marginBottom: '60px',
          },
        }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th' scope='row'>
                Name
              </StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>Total Starting Journey</StyledTableCell>
              <StyledTableCell align='center'>Total Ended Journey</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {station && (
              <StyledTableRow>
                <StyledTableCell component='th' scope='row'>
                  <Link
                    href={`https://www.google.com/maps/place/${station.address}/@${station.x},${station.y}`}
                    target='blank'
                    color='secondary'
                    underline='none'
                  >
                    {station.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align='center'>{station.address}</StyledTableCell>
                <StyledTableCell align='center'>{station.numOfStartingJourney}</StyledTableCell>
                <StyledTableCell align='center'>{station.numOfEndingJourney}</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default StationDetails
