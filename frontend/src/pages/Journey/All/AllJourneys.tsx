import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import {
  Box,
  Container,
  TableFooter,
  TablePagination,
  Typography,
  useMediaQuery,
} from '@mui/material'
import ImportExportIcon from '@mui/icons-material/ImportExport'

import theme from '../../../components/Ui/theme'
import ErrorAlert from '../../../components/Ui/ErrorAlert'
import Search from '../../../components/Search/Search'
import { StyledTableCell, StyledTableRow } from '../../../components/Ui/tableStyles'
import TablePaginationActions from '../../../components/Ui/TablePaginationActions'

import { journeyActions } from '../../../redux/slices/journeySlice'
import { getAllJourneys } from '../../../redux/methods/journeyMethods'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook'

enum SortType {
  Asc = 'Asc',
  Desc = 'Desc',
}

function AllJourney() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [searchKeyWord, setSearch] = useState('')
  const [sortType, setSortType] = useState<string>(SortType.Desc)

  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const { journeys, totalJourneys, isError, isLoading } = useAppSelector((state) => state.journey)
  const dispatch = useAppDispatch()

  const SortTypeHandler = () => {
    setSortType((prev) => (prev === SortType.Desc ? SortType.Asc : SortType.Desc))
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(journeyActions.clearError())
      }, 500)
    }
  }, [isError])

  useEffect(() => {
    const filter = {
      searchKeyWord: searchKeyWord,
      pageNumber: page + 1,
      sort: sortType,
    }

    dispatch(getAllJourneys(filter))
  }, [page, searchKeyWord, sortType])

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Container
      sx={{
        marginTop: '18%',

        [theme.breakpoints.up('sm')]: {
          marginTop: '6%',
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
          fontSize: '2rem',
          fontWeight: 600,
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
          },
        }}
      >
        List of Journey
      </Typography>

      <Box
        sx={{
          '& .MuiTextField-root': { mb: 1, width: '20ch' },
          textAlign: 'end',
          marginLeft: '0',
          marginTop: '8%',
          [theme.breakpoints.down('sm')]: {
            '& .MuiTextField-root': { mb: 1, width: '13ch' },
            textAlign: 'end',
            marginLeft: '0',
            marginTop: '15%',
          },
        }}
      >
        <Search setSearch={setSearch} />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          margin: '0 auto 120px auto',
          width: '100%',
          overflow: 'hidden',
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: '40px',
          },
        }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th' scope='row'>
                Departure
                <ImportExportIcon sx={{ cursor: 'pointer' }} onClick={SortTypeHandler} />
              </StyledTableCell>
              <StyledTableCell align='center'>Return</StyledTableCell>
              <StyledTableCell align='center'>Distance (km)</StyledTableCell>
              {!matches && <StyledTableCell align='center'>Duration (min)</StyledTableCell>}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {journeys.length > 0 &&
              journeys.map((j) => (
                <StyledTableRow key={j.id}>
                  <StyledTableCell component='th' scope='row'>
                    {j.departureStationName}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{j.returnStationName}</StyledTableCell>
                  <StyledTableCell align='center'>{j.coveredDistance.toFixed(2)}</StyledTableCell>
                  {!matches && <StyledTableCell align='center'>{j.duration}</StyledTableCell>}
                </StyledTableRow>
              ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[8]}
                colSpan={4}
                count={totalJourneys}
                rowsPerPage={rowsPerPage}
                page={!totalJourneys || totalJourneys <= 0 ? 0 : page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default AllJourney
