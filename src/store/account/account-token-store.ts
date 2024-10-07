import { LocalStorageKey } from '@api'
import { atom } from 'recoil'

export const accountTokenState = atom<string | null>({
  key: 'accountTokenState',
  default: localStorage.getItem(LocalStorageKey.ACCOUNT_TOKEN),
})
