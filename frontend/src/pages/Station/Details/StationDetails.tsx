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
import { stationActions } from '../../../redux/slices/stationSlice'
import ErrorAlert from '../../../components/Ui/ErrorAlert'

function StationDetails() {
  const { stationDetails, isError, isLoading } = useAppSelector((state) => state.station)
  const dispatch = useAppDispatch()

  const params = useParams()

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(stationActions.clearError())
      }, 1000)
    }
  }, [isError])

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
      {isError && !isLoading && <ErrorAlert message={isError.message} />}

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
            {stationDetails && (
              <StyledTableRow>
                <StyledTableCell component='th' scope='row'>
                  <Link
                    href={`https://www.google.com/maps/place/${stationDetails.address}/@${stationDetails.x},${stationDetails.y}`}
                    target='blank'
                    color='secondary'
                    underline='none'
                  >
                    {stationDetails.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align='center'>{stationDetails.address}</StyledTableCell>
                <StyledTableCell align='center'>
                  {stationDetails.numOfStartingJourney}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {stationDetails.numOfEndingJourney}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default StationDetails
