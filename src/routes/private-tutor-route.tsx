import { Layout } from '@components'
import { TutorMainPage, TutorIntroductionPage, TutorFeedbackPage } from '@pages'
import { Route, Routes } from 'react-router-dom'

export function PrivateTutorRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<TutorMainPage />} />
        <Route path="/course/feedbacks" element={<TutorFeedbackPage />} />
      </Route>
      <Route path="/tutor/:publicId" element={<TutorIntroductionPage />} />
    </Routes>
  )
}
