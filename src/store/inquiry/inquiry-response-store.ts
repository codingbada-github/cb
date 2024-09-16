import { atom } from 'recoil'

import { PostInquiryResponse } from '@api'

export const postInquiryResponseState = atom<PostInquiryResponse>({
  key: 'postInquiryResponseState',
  default: {
    public_id: '',
    phone_number: '',
    content: '',
  },
})
