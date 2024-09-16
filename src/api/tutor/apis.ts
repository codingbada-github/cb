import { GetTutorDetailResponse } from './schemas'
import requestHandler from '@api/request-handler'

const PATH = '/tutor'

export const tutorApis = {
  getTutor: async (publicId: string) => {
    return await requestHandler<GetTutorDetailResponse>({
      url: PATH + `/${publicId}`,
    })
  },
}
