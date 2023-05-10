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
  },
  customColors: {
    blue: '#0069ac',
  },
})

export default theme
