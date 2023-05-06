import { IconButton } from '@mui/material'
import { styled } from '@mui/system'

export const MyStyledButton = styled('button')(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const MyStyledIconButton = styled(IconButton)({
  marginLeft: 'auto !important',
  height: '50px !important',
  width: '50px !important',
})

export const MyStyledListItem = styled(IconButton)({
  fontSize: '1.2rem',
  fontFamily: 'Raleway ',
  textTransform: 'none',
  color: '#fff',
  fontWeight: 700,
})
