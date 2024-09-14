import { atom } from 'recoil'

export const accountTokenState = atom<string | null>({
  key: 'accountTokenState',
  default: localStorage.getItem('account_token'),
})
