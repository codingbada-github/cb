import { HttpMethod } from '@api/enums'
import { PostTutorLoginRequest, PostTutorLoginResponse, GetTutorDetailResponse, GetTutorStudentsResponse, PatchTutorProfileRequest } from './schemas'
import requestHandler from '@api/request-handler'

const PATH = '/tutor'

export const tutorApis = {
  postTutorLogin: async (PostInquiryRequest: PostTutorLoginRequest) => {
    return await requestHandler<PostTutorLoginResponse>({
      url: '/tutor-login',
      method: HttpMethod.POST,
      data: PostInquiryRequest,
    })
  },
  getTutorDetail: async (publicId: string) => {
    return await requestHandler<GetTutorDetailResponse>({
      url: PATH + `/${publicId}`,
    })
  },
  getTutorStudents: async () => {
    return await requestHandler<GetTutorStudentsResponse>({
      url: '/tutor-students',
    })
  },
  patchTutorProfile: async (profile_data?: PatchTutorProfileRequest, profile_image?: File) => {
    const formData = new FormData()
    if (profile_data) formData.append('profile_data', JSON.stringify(profile_data))
    if (profile_image) formData.append('profile_image', profile_image)

    return await requestHandler<GetTutorDetailResponse>({
      url: '/tutor-profile',
      method: HttpMethod.PATCH,
      data: formData,
    })
  },
}
