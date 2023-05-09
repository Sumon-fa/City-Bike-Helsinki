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
