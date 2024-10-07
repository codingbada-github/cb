import { Layout } from '@components'
import { ParentMainPage, TutorIntroductionPage } from '@pages'
import { Route, Routes } from 'react-router-dom'

export function PrivateParentRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<ParentMainPage />} />
      </Route>
      <Route path="/tutor/:publicId" element={<TutorIntroductionPage />} />
    </Routes>
  )
}
