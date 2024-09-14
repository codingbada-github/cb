import { MainPage } from '@pages'
import { Route, Routes } from 'react-router-dom'

export function PrivateRoute() {
  return (
    <Routes>
      <Route path="*" element={<MainPage />} />
    </Routes>
  )
}
