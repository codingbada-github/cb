import { createTheme } from '@mui/material/styles'

export const globalTheme = createTheme({
  typography: {
    fontFamily: 'Pretendard',
  },
  palette: {
    primary: {
      main: '#0892d0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: '3px',
          '&:hover': {
            borderWidth: '3px',
          },
        },
      },
    },
  },
})
