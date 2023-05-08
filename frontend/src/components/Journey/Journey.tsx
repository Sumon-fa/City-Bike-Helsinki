import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import { TableFooter, TablePagination } from '@mui/material'
import TablePaginationActions from '../Ui/TablePaginationActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { getAllJourneys } from '../../redux/methods/journeyMethods'
import { MyStyledImg, StyledTableCell, StyledTableRow } from './journeyStyle'
import bikes from '../../assets/bikes.jpg'
import theme from '../Ui/theme'

export default function Journey() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const { journeys, totalJourneys } = useAppSelector((state) => state.journey)
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
          margin: '0 auto 60px auto',
          width: 'max-content',
          overflow: 'hidden',
          [theme.breakpoints.down('sm')]: {
            width: '350px',
          },
        }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th' scope='row'>
                Departure
              </StyledTableCell>
              <StyledTableCell align='center'>Return</StyledTableCell>
              <StyledTableCell align='center'>Covered Distance (m)</StyledTableCell>
              <StyledTableCell align='center'>Duration (sec)</StyledTableCell>
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
                  <StyledTableCell align='center'>{j.duration}</StyledTableCell>
                </StyledTableRow>
              ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>

          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[8]}
                colSpan={4}
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
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
