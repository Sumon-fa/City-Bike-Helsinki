import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      blue: string
    }
  }
  interface ThemeOptions {
    customColors: {
      blue: React.CSSProperties['color']
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#1281d5',
    },
    common: {
      black: '#1281d5',
    },
  },
  customColors: {
    blue: '#1281d5',
  },
})

export default theme
