import { useNavigate } from 'react-router-dom'
import { GetTutorDetailResponse, StudentListSchema, GetTutorStudentsResponse, PatchTutorProfileRequest, GenderType, LocalStorageKey, RequestApi } from '@api'
import styled from '@emotion/styled'
import Face3Icon from '@mui/icons-material/Face3'
import FaceIcon from '@mui/icons-material/Face'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { Card } from '@mui/material'
import { useToastClear } from '@hooks'
import { useEffect, useState } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { isErrorToastOpenState, errorToastMessageState, isSuccessToastOpenState, successToastMessageState, accountTokenState } from '@store'

interface ProfileItemProps {
  label: string
  content: React.ReactNode
  isEnter?: boolean
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, content, isEnter = false }) => (
  <>
    <li>
      <strong>{label}</strong>&nbsp;:&nbsp;
      {isEnter && <div style={{ height: '0.3em' }}></div>}
      {content}
    </li>
    <div style={{ height: '0.8em' }}></div>
  </>
)

export function TutorMainPage() {
  useToastClear()
  const navigate = useNavigate()
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false)
  const [tutorStudentsResponse, setTutorStudentsResponse]: [GetTutorStudentsResponse | undefined, Function] = useState()
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState)
  const setAccountToken: SetterOrUpdater<string | null> = useSetRecoilState(accountTokenState)
  const [isOpen, setIsOpen] = useState(false)

  const [imageData, setImageData] = useState<File | null>(null)
  const [profileData, setProfileData] = useState<PatchTutorProfileRequest>({
    nickname: '',
    korean_nickname: '',
    email: '',
    phone_number: '',
    address: '',
    university: '',
    activity: '',
    introduction: '',
  })

  const navigateFeedback = (course_public_id: string, children_public_id: string, children_name: string) => {
    navigate("/course/feedbacks", {
      state: {
        course_public_id,
        children_public_id,
        children_name
      },
    })
  }

  const toggleContent = () => {
    setIsOpen(!isOpen)
  }

  const handleResizeKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement

    if (textarea) {
      var scrollLeft = window.scrollX
      var scrollTop = window.scrollY

      textarea.style.height = 'auto'
      let height = textarea.scrollHeight
      textarea.style.height = `${height + 8}px`

      window.scrollTo(scrollLeft, scrollTop)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageData(file)
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleEditSubmit = async () => {
    ;(async () => {
      try {
        // 필드 변경여부 확인
        const filteredProfileData = { ...profileData }
        if (tutorStudentsResponse) {
          const { tutor } = tutorStudentsResponse
          const fieldsToCheck: (keyof PatchTutorProfileRequest)[] = [
            'nickname', 'korean_nickname', 'email', 'phone_number', 'address', 'university', 'activity', 'introduction',
          ]
          fieldsToCheck.forEach((field) => {
            if (profileData[field] === tutor[field]) {
              delete filteredProfileData[field]
            }
          })
        }

        const isRequestData = (Object.keys(filteredProfileData).length > 0)
        const isRequestImage = (imageData !== null)
        if (isRequestData || isRequestImage) {
          // 프로필 수정 API 호출
          const tutorDetailResponse: GetTutorDetailResponse = await RequestApi.tutor.patchTutorProfile(
            isRequestData ? filteredProfileData : undefined, // 선택적
            isRequestImage ? imageData : undefined // 선택적
          )

          // 데이터 새로고침 (+ useEffect)
          if (isRequestImage) setImageData(null)
          if (tutorDetailResponse) {
            setTutorStudentsResponse((prevState: GetTutorStudentsResponse | undefined) => {
              if (!prevState) return prevState
              return {
                ...prevState,
                tutor: {
                  ...prevState.tutor,
                  ...tutorDetailResponse,
                  phone_number: tutorDetailResponse.phone_number?.replace(/-/g, '') || '',  // phone_number 필드의 '-' 문자를 모두 제거
                  introduction_page_link: prevState.tutor.introduction_page_link,
                },
              }
            })
          }

          setTimeout(() => {
            setIsSuccessToastOpen(true)
            setSuccessToastMessage('프로필 수정 성공!')
          }, 100)
        }
      } catch (error: any) {
        setIsErrorToastOpen(true)
        setErrorToastMessage('프로필 수정 실패!')
        console.log(error)
      }
    })()
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const tutorStudentsResponse = await RequestApi.tutor.getTutorStudents()
        setTutorStudentsResponse(tutorStudentsResponse)
        setIsLoading(false)
      } catch (error: any) {
        setIsLoading(false)
        localStorage.removeItem(LocalStorageKey.ACCOUNT_TOKEN)
        setAccountToken(null)
        navigate('/')
      }
    })()
  }, [navigate])

  useEffect(() => {
    if (tutorStudentsResponse) {
      const { tutor } = tutorStudentsResponse
      setProfileData({
        nickname: tutor.nickname || '',
        korean_nickname: tutor.korean_nickname || '',
        email: tutor.email || '',
        phone_number: tutor.phone_number || '',
        address: tutor.address || '',
        university: tutor.university || '',
        activity: tutor.activity || '',
        introduction: tutor.introduction || '',
      })
    }
  }, [tutorStudentsResponse])
  
  useEffect(() => {
    if (isOpen) {
      const textareas = document.querySelectorAll('.autoTextarea') as NodeListOf<HTMLTextAreaElement>  // 복수 개수
      textareas.forEach(textarea => {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight + 8}px`
      })
    }
  }, [isOpen])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Container>
      <Content>
        <MainContent>
          <TutorGreeting>
            <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '20px' }}>안녕하세요,</span>
            <span style={{ color: 'var(--main-color)', fontWeight: '500', fontSize: '20px' }}>{tutorStudentsResponse?.tutor.nickname} 강사님</span>
          </TutorGreeting>

          <TutorCard>
            <TutorTopSection>
              <TutorName>
                {tutorStudentsResponse?.tutor.nickname} <TutorBadge>강사</TutorBadge>
              </TutorName>

              <TutorViewDetail
                onClick={() => {
                  window.open(tutorStudentsResponse?.tutor.introduction_page_link, '_blank')
                }}
              >
                &#x1F4CE; 소개서
              </TutorViewDetail>
            </TutorTopSection>

            <TutorProfile>
              <ProfileImage src={tutorStudentsResponse?.tutor.profile_image} />
            </TutorProfile>

            <TutorClassState>
              {tutorStudentsResponse?.students && tutorStudentsResponse?.students.length > 0
                ? `${tutorStudentsResponse?.students.length}명의 수업 진행 중`
                : '진행 중인 수업 없음'}
            </TutorClassState>

            <ProfileToggleDivider />
            <ProfileToggleButton onClick={toggleContent}>
              {isOpen ? (
                <>
                  프로필 닫기&nbsp;<KeyboardDoubleArrowUpIcon style={{ fontSize: '18px' }}></KeyboardDoubleArrowUpIcon>
                </>
              ) : (
                <>
                  프로필 열기&nbsp;<KeyboardDoubleArrowDownIcon style={{ fontSize: '18px' }}></KeyboardDoubleArrowDownIcon>
                </>
              )}
            </ProfileToggleButton>

            <ProfileToggleContent isOpen={isOpen}>
              <br />
              <ul>
                <ProfileItem label="프로필 사진" content={<input type="file" accept="image/*" onChange={handleImageChange} />} />
                <ProfileItem label="닉네임 (영문)" content={<input type="text" name="nickname" value={profileData.nickname} onChange={handleProfileChange} />} />
                <ProfileItem label="닉네임 (한글)" content={<input type="text" name="korean_nickname" value={profileData.korean_nickname} onChange={handleProfileChange} />} />
                <ProfileItem label="이메일" content={<input type="text" name="email" value={profileData.email} onChange={handleProfileChange} />} />
                <ProfileItem label="전화번호" content={<input type="text" name="phone_number" value={profileData.phone_number} onChange={handleProfileChange} />} />
                <ProfileItem label="주소" content={<input type="text" name="address" value={profileData.address} onChange={handleProfileChange} />} />
                <ProfileItem label="학력사항" content={<textarea className="autoTextarea" name="university" value={profileData.university} onChange={handleProfileChange} onKeyUp={handleResizeKeyUp} />} isEnter={true} />
                <ProfileItem label="활동경력" content={<textarea className="autoTextarea" name="activity" value={profileData.activity} onChange={handleProfileChange} onKeyUp={handleResizeKeyUp} />} isEnter={true} />
                <ProfileItem label="자기소개" content={<textarea className="autoTextarea" name="introduction" value={profileData.introduction} onChange={handleProfileChange} onKeyUp={handleResizeKeyUp} />} isEnter={true} />
              </ul>
              <ProfileToggleDivider style={{ marginTop: '15px', paddingBottom: '22px' }} />
              <ProfileEditButton onClick={handleEditSubmit}>편집 저장</ProfileEditButton>
            </ProfileToggleContent>
          </TutorCard>

          <SectionTitle>최근 수업</SectionTitle>
          <ChildrenCardContainer>
            {tutorStudentsResponse?.students && tutorStudentsResponse.students.length > 0 ? (
              tutorStudentsResponse.students.map((student: StudentListSchema, index: number) => (
                <ChildrenCard key={index}>
                  <ChildrenProfile>
                    {student.gender === GenderType.MALE ? (
                      <FaceIcon style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Face3Icon style={{ width: '100%', height: '83%', objectFit: 'cover' }} />
                    )}
                  </ChildrenProfile>

                  <ChildrenDescription>
                    <ChildrenName>
                      {student.name}&nbsp;
                      {student.gender === GenderType.MALE ? (
                        <ChildrenGenderMale>&#9794;</ChildrenGenderMale>
                      ) : (
                        <ChildrenGenderFemale>&#9792;</ChildrenGenderFemale>
                      )}
                      <ChildrenCourseName>&nbsp;/&nbsp;&nbsp;{student.recent_course.name}</ChildrenCourseName>
                    </ChildrenName>
                    <ChildrenBirthYear>{student.birth_year}년생</ChildrenBirthYear>
                    <ChildrenPhoneNumber>{student.phone_number || ''}</ChildrenPhoneNumber>
                    <ChildrenDetailButtonSection>
                      <ChildrenDetailButton 
                        onClick={() => navigateFeedback(
                          student.recent_course.course_public_id, 
                          student.children_public_id, 
                          student.name
                        )}
                      >
                        {'>'} 피드백 작성
                      </ChildrenDetailButton>
                    </ChildrenDetailButtonSection>
                  </ChildrenDescription>
                </ChildrenCard>
              ))
            ) : (
              <ChildrenCard>
                <ChildrenCardNoneText>최근 수업 없음</ChildrenCardNoneText>
              </ChildrenCard>
            )}
          </ChildrenCardContainer>
        </MainContent>

        <Copyright>Copyright © CodingBada All Rights Reserved.</Copyright>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 90px 30px 60px;
  background-color: #f8f9fa;

  @media (min-width: 450px) {
    padding-top: 110px;
  }
`
const Content = styled.div`
  width: 100%;
  max-width: 800px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const MainContent = styled.div`
  flex-grow: 1;
`
const TutorGreeting = styled.div`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 5px;

  display: flex;
  justify-content: center;
`

const TutorCard = styled(Card)`
  margin-bottom: 30px;
  width: 100%;
  padding: 15px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const TutorTopSection = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TutorName = styled.div`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
`
const TutorBadge = styled.span`
  margin-left: 7px;
  background-color: #c6c7c8;
  font-size: 14px;
  border-radius: 5px;
  padding: 4px 7px;
  font-weight: 500;
`
const TutorViewDetail = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: var(--gray-color);
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #333131;
  }
`

const TutorProfile = styled.div`
  width: 120px;
  height: 120px;
  background-color: rgb(230, 244, 250);
  border-radius: 50%;
  margin: 32px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TutorClassState = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const ProfileToggleDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px dashed lightgray;
  margin: 15px 0;
`
const ProfileToggleButton = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #474646;
  cursor: pointer;
  padding-left: 16px;
  display: flex;
  align-items: center;

  &:hover {
    color: #100f0f;
  }
`
const ProfileToggleContent = styled.div<{ isOpen: boolean }>`
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;

  // 편집저장 버튼의 오른쪽 배치에 활용.
  position: relative;

  ul {
    padding-left: 20px;
    white-space: pre-wrap;
  }

  input[type='text'] {
    padding: 2px 3px;
    border: 1.5px solid black;
    border-radius: 4px;
  }

  textarea {
    padding: 3px 4px;
    border: 1.5px solid black;
    border-radius: 4px;
    min-width: 220px;
    width: 100%;
    resize: none;
    box-sizing: border-box;
  }
`
const ProfileEditButton = styled.button`
  font-size: 13px;
  color: white;
  background-color: #0992d0;
  border: solid 0.9px black;
  border-radius: 4px;
  padding: 3px 4px;
  cursor: pointer;

  &:hover {
    background-color: #0071a6;
  }

  // 편집저장 버튼의 오른쪽 배치에 활용.
  position: absolute;
  right: 0;
  bottom: 0px;
`

const SectionTitle = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
`
const ChildrenCardContainer = styled.div`
  margin-bottom: 20px;
`
const ChildrenCard = styled(Card)`
  margin-bottom: 9px;
  width: 100%;
  height: 100px;
  padding: 0 20px;
  display: flex;
  align-items: center;
`
const ChildrenCardNoneText = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 17px;
  color: var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
`
const ChildrenProfile = styled.div`
  margin-right: 15px;
  width: 60px;
  height: 60px;
  background-color: rgb(230, 244, 250);
  border-radius: 50%;
`

const ChildrenDescription = styled.div`
  width: calc(100% - 75px);
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ChildrenName = styled.div`
  font-weight: bold;
  font-size: 20px;
`
const ChildrenCourseName = styled.span`
  font-size: 13px;
  color: black;
`
const ChildrenBirthYear = styled.span`
  font-size: 12px;
  color: var(--gray-color);
`
const ChildrenPhoneNumber = styled.span`
  font-size: 12px;
  color: var(--gray-color);
`
const ChildrenGenderMale = styled.span`
  font-weight: bold;
  color: #0c5fdb;
`
const ChildrenGenderFemale = styled.span`
  font-weight: bold;
  color: #ea3f15;
`

const ChildrenDetailButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ChildrenDetailButton = styled.div`
  display: flex;
  color: var(--gray-color);
  font-size: 13px;
  font-weight: 460;
  justify-content: flex-end;
  cursor: pointer;

  &:hover {
    color: #100f0f;
  }
`

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  color: #868e96;
  padding: 20px 0 10px;
  margin-top: auto;

  font-size: 12px;
`
