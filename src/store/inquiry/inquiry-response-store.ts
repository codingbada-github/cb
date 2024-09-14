import { atom } from 'recoil'

import { postInquiryResponse } from '@api'

export const postInquiryResponseState = atom<postInquiryResponse>({
  key: 'postInquiryResponseState',
  default: {
    public_id: '',
    phone_number: '',
    content: '',
  },
})
