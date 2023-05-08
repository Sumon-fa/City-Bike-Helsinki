import React, { useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody, { TableBodyTypeMap } from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { CircularProgress, TableFooter, TablePagination } from '@mui/material'
import TablePaginationActions from '../Ui/TablePaginationActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { getAllJourneys } from '../../redux/methods/journeyMethods'
import { MyStyledImg } from './journeyStyle'
import bikes from '../../assets/bikes.jpg'

export default function Journey() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const { journeys, isLoading, isError, totalJourneys } = useAppSelector((state) => state.journey)
  const dispatch = useAppDispatch()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    const filter = {
      title: '',
      pageNumber: page + 1,
    }
    dispatch(getAllJourneys(filter))
  }, [page])

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalJourneys) : 0

  return (
    <>
      <MyStyledImg src={bikes} alt='bike-image' loading='lazy' />
      <TableContainer
        component={Paper}
        sx={{
          margin: '0 auto 50px auto',
          maxWidth: '80%',
          overflow: 'hidden',
        }}
      >
        {isLoading && (
          <CircularProgress color='secondary' sx={{ display: 'flex', margin: 'auto' }} />
        )}
        <Table sx={{ minWidth: 600 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th' scope='row'>
                Departure
              </TableCell>
              <TableCell align='center'>Return</TableCell>
              <TableCell align='center'>Covered Distance (m)</TableCell>
              <TableCell align='center'>Duration (sec)</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading && !isError && (
            <TableBody>
              {journeys.length > 0 &&
                journeys.map((j) => (
                  <TableRow key={j.id}>
                    <TableCell component='th' scope='row'>
                      {j.departureStationName}
                    </TableCell>
                    <TableCell align='center'>{j.returnStationName}</TableCell>
                    <TableCell align='center'>{j.coveredDistance}</TableCell>
                    <TableCell align='center'>{j.duration}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          )}

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[8]}
                colSpan={3}
                count={totalJourneys}
                rowsPerPage={rowsPerPage}
                page={page}
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
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
