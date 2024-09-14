import { HttpMethod } from '@api/enums'
import { postInquiryRequest, postInquiryResponse } from './schemas'
import requestHandler from '@api/request-handler'

const PATH = '/inquiry'

export const inquiryApis = {
  postInquiry: async (postInquiryRequest: postInquiryRequest) => {
    return await requestHandler<postInquiryResponse>({
      url: PATH,
      method: HttpMethod.POST,
      data: postInquiryRequest,
    })
  },
}
