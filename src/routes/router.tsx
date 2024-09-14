import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { accountTokenState } from '@store'
import { PrivateRoute } from './private-route'
import { PublicRoute } from './public-route'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { isMobileState } from '@store'
import { isMobile } from 'react-device-detect'

export function Router() {
  const setIsMobile: SetterOrUpdater<boolean> = useSetRecoilState(isMobileState)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [setIsMobile])

  const accountToken: string | null = useRecoilValue(accountTokenState)

  return <BrowserRouter>{accountToken ? <PrivateRoute /> : <PublicRoute />}</BrowserRouter>
}
