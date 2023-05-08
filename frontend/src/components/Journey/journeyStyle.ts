import { TableCell, TableRow, tableCellClasses } from '@mui/material'
import { styled } from '@mui/system'

export const MyStyledImg = styled('img')(({ theme }) => ({
  maxHeight: '246px',
  maxWidth: '100%',
  verticalAlign: 'initial',
  padding: 0,
  boxSizing: 'border-box',
  display: 'flex',
  margin: '171px auto 125px auto',
  [theme.breakpoints.down('md')]: {
    height: '100px',
    margin: '140px auto 70px auto',
  },
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
}))
