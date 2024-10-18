import { Layout } from '@components'
import { TutorMainPage, TutorIntroductionPage } from '@pages'
import { Route, Routes } from 'react-router-dom'

export function PrivateTutorRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<TutorMainPage />} />
      </Route>
      <Route path="/tutor/:publicId" element={<TutorIntroductionPage />} />
    </Routes>
  )
}
