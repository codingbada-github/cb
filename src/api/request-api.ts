import { inquiryApis } from './inquiry'
import { tutorApis } from './tutor'

export const RequestApi = {
  /**
   * External Service
   */
  inquiry: { ...inquiryApis },
  tutor: { ...tutorApis },
}
