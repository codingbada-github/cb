import { HttpMethod } from '@api/enums'
import { PostTutorLoginRequest, PostTutorLoginResponse, GetTutorDetailResponse, GetTutorStudentsResponse, PatchTutorProfileRequest, GetTutorFeekbackResponse, PostTutorFeekbackRequest, PostTutorFeekbackResponse, PatchTutorFeekbackRequest } from './schemas'
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
  getTutorCourseFeedbacks: async (course_public_id: string, children_public_id: string) => {
    return await requestHandler<GetTutorFeekbackResponse>({
      url: '/course-feedbacks' + `?course_public_id=${course_public_id}` + `&children_public_id=${children_public_id}`,
      method: HttpMethod.GET,
    })
  },
  postTutorCourseFeedbacks: async (tutorFeekbackRequest: PostTutorFeekbackRequest) => {
    return await requestHandler<PostTutorFeekbackResponse>({
      url: '/course-feedbacks',
      method: HttpMethod.POST,
      data: tutorFeekbackRequest,
    })
  },
  patchTutorCourseFeedbacks: async (tutorFeekbackRequest: PatchTutorFeekbackRequest) => {
    return await requestHandler<void>({
      url: '/course-feedbacks',
      method: HttpMethod.PATCH,
      data: tutorFeekbackRequest,
    })
  },
}
