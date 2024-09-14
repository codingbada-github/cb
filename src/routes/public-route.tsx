import { Layout } from '@components'
import { InquiryReceivedPage, LandingPage, MobileLandingPage } from '@pages'
import { Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isMobileState } from '@store'

export function PublicRoute() {
  const isMobile: boolean = useRecoilValue(isMobileState)

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={isMobile ? <MobileLandingPage /> : <LandingPage />} />
      </Route>
      <Route path="/inquiry-received" element={<InquiryReceivedPage />} />
    </Routes>
  )
}
