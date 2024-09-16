import { HttpMethod } from '@api/enums'
import { PostInquiryRequest, PostInquiryResponse } from './schemas'
import requestHandler from '@api/request-handler'

const PATH = '/inquiry'

export const inquiryApis = {
  postInquiry: async (PostInquiryRequest: PostInquiryRequest) => {
    return await requestHandler<PostInquiryResponse>({
      url: PATH,
      method: HttpMethod.POST,
      data: PostInquiryRequest,
    })
  },
}
