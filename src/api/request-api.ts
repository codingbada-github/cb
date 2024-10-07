import { inquiryApis } from './inquiry'
import { parentApis } from './parent'
import { tutorApis } from './tutor'

export const RequestApi = {
  /**
   * Internal Service
   */
  inquiry: { ...inquiryApis },
  tutor: { ...tutorApis },
  parent: { ...parentApis },
}
