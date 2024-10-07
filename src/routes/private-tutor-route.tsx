import { Route, Routes } from 'react-router-dom'

export function PrivateTutorRoute() {
  return (
    <Routes>
      <Route path="*" element={<>강사 페이지</>} />
    </Routes>
  )
}
