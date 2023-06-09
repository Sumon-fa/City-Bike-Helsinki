import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import {
  Box,
  Container,
  Link,
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

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook'
import { getAllStations } from '../../../redux/methods/stationMethods'
import { stationActions } from '../../../redux/slices/stationSlice'
import { NavLink } from 'react-router-dom'

enum SortType {
  Asc = 'Asc',
  Desc = 'Desc',
}

function AllStations() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [searchKeyWord, setSearch] = useState('')
  const [sortType, setSortType] = useState<string>(SortType.Desc)

  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const { stations, totalStations, isError, isLoading } = useAppSelector((state) => state.station)
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
        dispatch(stationActions.clearError())
      }, 500)
    }
  }, [isError])

  useEffect(() => {
    const filter = {
      searchKeyWord: searchKeyWord,
      pageNumber: page + 1,
      sort: sortType,
    }

    dispatch(getAllStations(filter))
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
        minHeight: '644px',
        [theme.breakpoints.up('sm')]: {
          marginTop: '6%',
          width: '60%',
          minHeight: '800px',
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
        List of Station
      </Typography>

      <Box
        sx={{
          '& .MuiTextField-root': {
            mb: 1,
            width: '20ch',
          },
          textAlign: 'end',
          marginLeft: '0',
          marginTop: '8%',
          [theme.breakpoints.down('sm')]: {
            '& .MuiTextField-root': {
              mb: 1,
              width: '13ch',
            },
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
            marginTop: '0',
            width: '100%',
            marginBottom: '9%',
          },
        }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th' scope='row'>
                Name
                <ImportExportIcon sx={{ cursor: 'pointer' }} onClick={SortTypeHandler} />
              </StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>City</StyledTableCell>
              {!matches && <StyledTableCell align='center'>Capacity</StyledTableCell>}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {stations.length > 0 &&
              stations.map((s) => (
                <StyledTableRow key={s.fid}>
                  <StyledTableCell component='th' scope='row'>
                    <Link
                      to={`/station/${s.fid}`}
                      component={NavLink}
                      color='secondary'
                      underline='none'
                    >
                      {s.nimi}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align='center'>{s.osoite}</StyledTableCell>
                  <StyledTableCell align='center'>{s.kaupunki}</StyledTableCell>
                  {!matches && <StyledTableCell align='center'>{s.kapasiteet}</StyledTableCell>}
                </StyledTableRow>
              ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[8]}
                colSpan={4}
                count={totalStations}
                rowsPerPage={rowsPerPage}
                page={!totalStations || totalStations <= 0 ? 0 : page}
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

export default AllStations
