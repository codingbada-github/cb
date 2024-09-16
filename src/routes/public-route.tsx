import { Layout } from '@components'
import { InquiryReceivedPage, LandingPage, MobileLandingPage, TutorIntroductionPage } from '@pages'
import { Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isMobileState } from '@store'
import { PageviewTracker } from '@utils'

export function PublicRoute() {
  const isMobile: boolean = useRecoilValue(isMobileState)
  // GA pageview tracker
  PageviewTracker()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={isMobile ? <MobileLandingPage /> : <LandingPage />} />
      </Route>
      <Route path="/tutor/:publicId" element={<TutorIntroductionPage />} />
      <Route path="/inquiry-received" element={<InquiryReceivedPage />} />
    </Routes>
  )
}
