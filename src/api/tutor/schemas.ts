export interface PostTutorLoginRequest {
  nickname: string
  password: string
}

export interface PostTutorLoginResponse {
  account_token: string
}

export interface GetTutorDetailResponse {
  nickname: string
  profile_image: string
  korean_nickname: string
  email: string
  phone_number: string
  address: string
  university: string
  activity: string
  introduction: string
}

export interface GetTutorDetailSchema {
  profile_image: string
  nickname: string
  korean_nickname: string
  email: string
  phone_number: string
  address: string
  university: string
  activity: string
  introduction: string
  introduction_page_link: string
}

export interface RecentCourseSchema {
  course_public_id: string
  name: string
}

export interface StudentListSchema {
  children_public_id: string
  recent_course: RecentCourseSchema
  name: string
  phone_number: string
  gender: string
  birth_year: number
}

export interface GetTutorStudentsResponse {
  tutor: GetTutorDetailSchema
  students: Array<StudentListSchema>
}

export interface PatchTutorProfileRequest {  // 선택적 속성들을 가짐.
  nickname?: string
  korean_nickname?: string
  email?: string
  phone_number?: string
  address?: string
  university?: string
  activity?: string
  introduction?: string
}
