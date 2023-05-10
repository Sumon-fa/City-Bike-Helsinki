import { TableCell, TableRow, tableCellClasses, tableRowClasses } from '@mui/material'
import { styled } from '@mui/system'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1281d5',
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.65rem',
      lineHeight: '0.7rem',
      boxSizing: 'border-box',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.65rem',
      lineHeight: '0.7rem',
    },
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  [`&.${tableRowClasses.footer}`]: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
}))
