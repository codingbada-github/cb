export interface PostParentLoginRequest {
  phone_number: string
  password: string
}

export interface PostParentLoginResponse {
  public_id: string
  account_token: string
  name: string
}

export interface ParentDetailSchema {
  name: string
}

export interface CourseDetailSchema {
  id: number
  name: string
  curriculum: string
  total_week_count: number
  thumbnail: string
}
export interface CourseFeedbackListSchema {
  public_id: string
  content: string
}

export interface CourseListSchema {
  course: CourseDetailSchema
  course_feedbacks: Array<CourseFeedbackListSchema>
}

export interface ChildrenListSchema {
  id: number
  name: string
  gender: string
  birth_year: number
  course_location: string
  course_state: string
  recent_course_done_week_count: number
  recent_course_total_week_count: number
  tutor_name: string
  tutor_profile_image: string
  tutor_introduction_page_link: string
  courses: Array<CourseListSchema>
}

export interface GetParentDetailResponse {
  parent: ParentDetailSchema
  childrens: Array<ChildrenListSchema>
}
