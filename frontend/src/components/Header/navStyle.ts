import { IconButton } from '@mui/material'
import { styled } from '@mui/system'

export const MyStyledButton = styled('button')(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const MyStyledIconButton = styled(IconButton)({
  marginLeft: 'auto',
  height: '50px',
  width: '50px',
})
