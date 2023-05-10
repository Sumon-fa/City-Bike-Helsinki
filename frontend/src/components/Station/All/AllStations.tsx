import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import { Link, TableFooter, TablePagination } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook'
import { getAllStations } from '../../../redux/methods/stationMethods'
import theme from '../../Ui/theme'
import { StyledTableCell, StyledTableRow } from '../../Ui/tableStyles'
import TablePaginationActions from '../../Ui/TablePaginationActions'
import { NavLink } from 'react-router-dom'

function AllStations() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const { stations, totalStations } = useAppSelector((state) => state.station)
  const dispatch = useAppDispatch()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    const filter = {
      title: '',
      pageNumber: page + 1,
    }

    dispatch(getAllStations(filter))
  }, [page])

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalStations) : 0

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: '160px auto 120px auto',
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
              <StyledTableCell align='center'>City</StyledTableCell>
              <StyledTableCell align='center'>Capacity</StyledTableCell>
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
                  <StyledTableCell align='center'>{s.kapasiteet}</StyledTableCell>
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
                colSpan={5}
                count={totalStations}
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

export default AllStations
