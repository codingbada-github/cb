import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { accountTokenState } from '@store'
import { PrivateParentRoute } from './private-parent-route'
import { PublicRoute } from './public-route'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { isMobileState } from '@store'
import { isMobile } from 'react-device-detect'
import { jwtDecode } from 'jwt-decode'
import { AccountType, LocalStorageKey } from '@api'
import { PrivateTutorRoute } from './private-tutor-route'

interface AccountTokenPayload {
  type: string
}

export function Router() {
  const setIsMobile: SetterOrUpdater<boolean> = useSetRecoilState(isMobileState)
  const accountToken: string | null = useRecoilValue(accountTokenState)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [setIsMobile])

  const renderRoute = () => {
    if (accountToken) {
      try {
        const accountTokenPayload = jwtDecode<AccountTokenPayload>(accountToken)

        if (accountTokenPayload.type === AccountType.PARENT) {
          return <PrivateParentRoute />
        } else {
          return <PrivateTutorRoute />
        }
      } catch {
        localStorage.removeItem(LocalStorageKey.ACCOUNT_TOKEN)
        return <PublicRoute />
      }
    } else {
      return <PublicRoute />
    }
  }

  return <BrowserRouter>{renderRoute()}</BrowserRouter>
}
