import { Toast } from '@components'
import { ThemeProvider } from '@mui/material'
import { Router } from '@routes'
import { GlobalStyle, globalTheme } from '@styles'
import { RecoilRoot } from 'recoil'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={globalTheme}>
        <HelmetProvider>
          <GlobalStyle />
          <Router />
          <Toast />
        </HelmetProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
