import { Layout } from '@components'
import { TutorMainPage } from '@pages'
import { Route, Routes } from 'react-router-dom'

export function PrivateTutorRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<TutorMainPage />} />
      </Route>
    </Routes>
  )
}
