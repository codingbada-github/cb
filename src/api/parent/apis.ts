import { HttpMethod } from '@api/enums'
import { PostParentLoginRequest, PostParentLoginResponse, GetParentDetailResponse } from './schemas'
import requestHandler from '@api/request-handler'

const PATH = '/parent'

export const parentApis = {
  postParentLogin: async (PostInquiryRequest: PostParentLoginRequest) => {
    return await requestHandler<PostParentLoginResponse>({
      url: '/parent-login',
      method: HttpMethod.POST,
      data: PostInquiryRequest,
    })
  },
  getParentDetail: async () => {
    return await requestHandler<GetParentDetailResponse>({
      url: PATH,
    })
  },
}
