import { Toast } from '@components'
import { ThemeProvider } from '@mui/material'
import { Router } from '@routes'
import { GlobalStyle, globalTheme } from '@styles'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={globalTheme}>
        <GlobalStyle />
        <Router />
        <Toast />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
