import { useNavigate } from 'react-router-dom'
import { CourseFeedbackListSchema, CourseListSchema, GenderType, GetParentDetailResponse, LocalStorageKey, RequestApi } from '@api'
import styled from '@emotion/styled'
import { useToastClear } from '@hooks'
import Face3Icon from '@mui/icons-material/Face3'
import FaceIcon from '@mui/icons-material/Face'
import { Card, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { accountTokenState } from '@store'
import Slider from '@mui/material/Slider'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TextareaAutosize } from '@mui/base'

export function ParentMainPage() {
  useToastClear()
  const navigate = useNavigate()
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false)
  const [parentDetailResponse, setParentDetailResponse]: [GetParentDetailResponse | undefined, Function] = useState()
  const setAccountToken: SetterOrUpdater<string | null> = useSetRecoilState(accountTokenState)

  const [isCourseModalOpen, setIsCourseModalOpen]: [boolean, Function] = useState(false)
  const [courseIndex, setCourseIndex]: [number, Function] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const parentDetailResponse = await RequestApi.parent.getParentDetail()
        setParentDetailResponse(parentDetailResponse)
        setIsLoading(false)
      } catch (error: any) {
        setIsLoading(false)
        localStorage.removeItem(LocalStorageKey.ACCOUNT_TOKEN)
        setAccountToken(null)
        navigate('/')
      }
    })()
  }, [navigate])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Container>
      <Content>
        <ParentGreeting>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '20px' }}>안녕하세요,</span>
          <span style={{ color: 'var(--main-color)', fontWeight: '500', fontSize: '20px' }}>{parentDetailResponse?.parent.name}</span>
        </ParentGreeting>

        <ChildrenCard>
          <ChildrenTopSection>
            <ChildrenName>
              {parentDetailResponse?.childrens[0].name} <ChildrenBadge>자녀</ChildrenBadge>
            </ChildrenName>

            <ChildrenBirthYear>{parentDetailResponse?.childrens[0].birth_year}년생</ChildrenBirthYear>
          </ChildrenTopSection>

          <ChildrenProfile>
            {parentDetailResponse?.childrens[0].gender === GenderType.MALE ? (
              <FaceIcon style={{ fontSize: '100px' }}></FaceIcon>
            ) : (
              <Face3Icon style={{ fontSize: '80px', paddingBottom: '10px' }} />
            )}
          </ChildrenProfile>

          <ChildrenClassState>{parentDetailResponse?.childrens[0].course_state}</ChildrenClassState>
          <ChildrenClassProgress>
            {parentDetailResponse?.childrens[0].recent_course_done_week_count === 0
              ? '첫 수업 준비를 하고 있어요.'
              : `${parentDetailResponse?.childrens[0].recent_course_done_week_count}번의 수업을 받았어요.`}
          </ChildrenClassProgress>

          <ChildrenProgressbarSection>
            <Slider
              sx={{
                '&.Mui-disabled': {
                  color: 'var(--main-color)',
                },
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                },
                '& .MuiSlider-rail': {
                  color: '#d8d8d8',
                  opacity: 1,
                  height: 3,
                },
              }}
              defaultValue={parentDetailResponse?.childrens[0].recent_course_done_week_count}
              step={1}
              marks
              max={parentDetailResponse?.childrens[0].recent_course_total_week_count}
              disabled
            />
          </ChildrenProgressbarSection>
        </ChildrenCard>

        <SectionTitle>담당 강사 - {parentDetailResponse?.childrens[0].course_location}</SectionTitle>
        <TutorCard>
          <TutorProfile>
            <ProfileImage src={parentDetailResponse?.childrens[0].tutor_profile_image} />
          </TutorProfile>

          <TutorDescription>
            <TutorName>{parentDetailResponse?.childrens[0].tutor_name}</TutorName>
            <TutorDetailButtonSection>
              <TutorDetailButton
                onClick={() => {
                  window.open(parentDetailResponse?.childrens[0].tutor_introduction_page_link, '_blank')
                }}
              >
                {'>'} 강사소개서 보러가기
              </TutorDetailButton>
            </TutorDetailButtonSection>
          </TutorDescription>
        </TutorCard>

        <SectionTitle>받은 수업</SectionTitle>
        <SectionDescription>
          자녀분의 수업 피드백을 확인하고 싶으시면,<br></br>아래의 수강하신 커리큘럼을 눌러주세요.
        </SectionDescription>

        {parentDetailResponse?.childrens[0].courses.map((course: CourseListSchema, index: number) => (
          <ClassCard
            key={`course-${index}`}
            onClick={() => {
              setCourseIndex(index)
              setIsCourseModalOpen(true)
            }}
          >
            <ClassImage src={course.course.thumbnail} />
          </ClassCard>
        ))}

        <Copyright>Copyright © CodingBada All Rights Reserved.</Copyright>
      </Content>

      <Modal open={isCourseModalOpen} onClose={() => setIsCourseModalOpen(false)}>
        <ModalContainer>
          <ModalCourseTitleSection>
            <ModalCourseTitle>{parentDetailResponse?.childrens[0].courses[courseIndex].course.name} 수업</ModalCourseTitle>
            <CloseIcon
              onClick={() => {
                setIsCourseModalOpen(false)
              }}
              style={{ fontSize: '30px', color: 'var(--gray-color)' }}
            />
          </ModalCourseTitleSection>

          <ModalCourseTitleDashBar />

          <ModalScrollContainer>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                <ModalSectionTitle>자녀 이름</ModalSectionTitle>
                <ModalSectionDescription>{parentDetailResponse?.childrens[0].name}</ModalSectionDescription>
              </div>
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                <ModalSectionTitle>수업시수</ModalSectionTitle>
                <ModalSectionDescription>
                  총 {parentDetailResponse?.childrens[0].courses[courseIndex].course.total_week_count}주 과정
                </ModalSectionDescription>
              </div>
            </div>

            <ModalSectionTitle>커리큘럼</ModalSectionTitle>
            <ModalCourseCurriculum disabled value={parentDetailResponse?.childrens[0].courses[courseIndex].course.curriculum} />

            <ModalSectionTitle>수업 피드백</ModalSectionTitle>
            <ModalCoursFeedbackSection>
              {parentDetailResponse?.childrens[0].courses[courseIndex].course_feedbacks &&
              parentDetailResponse?.childrens[0].courses[courseIndex].course_feedbacks.length > 0 ? (
                parentDetailResponse?.childrens[0].courses[courseIndex].course_feedbacks.map(
                  (courseFeedback: CourseFeedbackListSchema, index: number) => {
                    return (
                      <ModalCoursFeedbackAccodian key={`course-feedback-${index}`}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>{index + 1}번째 수업</AccordionSummary>
                        <AccordionDetails>
                          <ModalCoursFeedbackTextareaAutosize disabled value={courseFeedback.content} />
                        </AccordionDetails>
                      </ModalCoursFeedbackAccodian>
                    )
                  }
                )
              ) : (
                <ModalSectionDescription>첫 수업 이후 피드백이 작성 되어요.</ModalSectionDescription>
              )}
            </ModalCoursFeedbackSection>
          </ModalScrollContainer>
        </ModalContainer>
      </Modal>
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
`
const ParentGreeting = styled.div`
  width: 100%;
  margin-bottom: 20px;

  display: flex;
  justify-content: center;
`

const ChildrenCard = styled(Card)`
  margin-bottom: 30px;
  width: 100%;
  height: 300px;
  padding: 15px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const ChildrenTopSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ChildrenName = styled.div`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
`
const ChildrenBadge = styled.span`
  margin-left: 7px;
  background-color: #c6c7c8;
  font-size: 14px;
  border-radius: 5px;
  padding: 4px 7px;
  font-weight: 500;
`
const ChildrenBirthYear = styled.div`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
`

const ChildrenProfile = styled.div`
  width: 120px;
  height: 120px;
  background-color: rgb(230, 244, 250);
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const ChildrenClassState = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ChildrenClassProgress = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
`
const ChildrenProgressbarSection = styled.div`
  padding: 0 10px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`

const SectionTitle = styled.div`
  margin-bottom: 10px;

  font-weight: bold;
  font-size: 20px;
`
const SectionDescription = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: var(--gray-color);
`
const TutorCard = styled(Card)`
  margin-bottom: 30px;
  width: 100%;
  height: 90px;
  padding: 0 20px;

  display: flex;
  align-items: center;
`

const TutorProfile = styled.div`
  margin-right: 15px;
  width: 60px;
  height: 60px;
  background-color: rgb(230, 244, 250);
  border-radius: 50%;
`
const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TutorDescription = styled.div`
  width: calc(100% - 75px);
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const TutorName = styled.div`
  font-weight: bold;
  font-size: 20px;
`

const TutorDetailButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
`
const TutorDetailButton = styled.div`
  display: flex;
  color: var(--gray-color);
  font-size: 14px;
  justify-content: flex-end;
  cursor: pointer;
`

const ClassCard = styled(Card)`
  margin-bottom: 30px;
  width: 100%;
  height: 33vw;

  @media (min-width: 800px) {
    height: 264px;
  }
  cursor: pointer;
`
const ClassImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  color: #868e96;
  padding: 20px 0 10px;

  font-size: 12px;
`

const ModalContainer = styled(Paper)`
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 70%;
  padding: 30px;
`

const ModalCourseTitleSection = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ModalCourseTitle = styled.div`
  font-weight: bold;
  font-size: 23px;
`

const ModalCourseTitleDashBar = styled.div`
  height: 10px;
  border-bottom: 2px dashed var(--gray-color);
  padding-bottom: 10px;
`

const ModalScrollContainer = styled.div`
  height: calc(100% - 60px);

  overflow: auto;
`

const ModalCourseCurriculum = styled.textarea`
  min-height: 130px;
  box-sizing: border-box;
  width: 95%;
  border: 1px var(--gray-color) solid;
  border-radius: 5px;
  padding: 10px 15px;

  &:disabled {
    background-color: white;
    font-size: 16px;
    color: var(--gray-color);
  }
  resize: none;
`
const ModalSectionTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0 5px;
`
const ModalSectionDescription = styled.div`
  color: var(--gray-color);
`

const ModalCoursFeedbackSection = styled.div`
  height: 30px;
`
const ModalCoursFeedbackAccodian = styled(Accordion)`
  width: 95%;
  border: 1px solid var(--gray-color);
  box-shadow: none;
  margin-bottom: 1px;
`

const ModalCoursFeedbackTextareaAutosize = styled(TextareaAutosize)`
  width: 100%;
  outline: none;
  border: none;
  font-size: 16px;
  &:disabled {
    background-color: white;
    opacity: 1;
    color: var(--gray-color);
  }
  resize: none;
`
