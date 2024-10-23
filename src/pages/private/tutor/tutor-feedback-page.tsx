import { useNavigate, useLocation } from 'react-router-dom'
import { CourseFeedbackListSchema, GetTutorFeekbackResponse, PostTutorFeekbackRequest, PostTutorFeekbackResponse, PatchTutorFeekbackRequest, LocalStorageKey, RequestApi } from '@api'
import styled from '@emotion/styled'
import Slider from '@mui/material/Slider'
import Modal from '@mui/material/Modal'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { Card, Paper } from '@mui/material'
import { useToastClear } from '@hooks'
import { DebouncedButton } from '@components'
import { useEffect, useState } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { isErrorToastOpenState, errorToastMessageState, isSuccessToastOpenState, successToastMessageState, accountTokenState } from '@store'

interface DebouncedButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  backgroundColor: string
  text: React.ReactNode
}

const CustomCreateButton: React.FC<DebouncedButtonProps> = ({ onClick, backgroundColor, text }) => (
  <DebouncedButton
    onClick={onClick}
    sx={{ padding: '5px', width: '50px', height: '28px', fontSize: '14px', backgroundColor: backgroundColor }}
    variant="contained"
    text={text}
  />
)

const CustomEditButton: React.FC<DebouncedButtonProps> = ({ onClick, backgroundColor, text }) => (
  <DebouncedButton
    onClick={onClick}
    sx={{ padding: '5px', width: '40px', height: '21px', fontSize: '13px', backgroundColor: backgroundColor }}
    variant="contained"
    text={text}
  />
)

export function TutorFeedbackPage() {
  useToastClear()
  const navigate = useNavigate()
  const location = useLocation()
  const { course_public_id, children_public_id, children_name } = location.state
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false)
  const [courseFeekbackResponse, setCourseFeekbackResponse]: [GetTutorFeekbackResponse | undefined, Function] = useState()
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState)
  const setAccountToken: SetterOrUpdater<string | null> = useSetRecoilState(accountTokenState)

  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [content, setContent] = useState("")  // 입력 텍스트 필드 (Create & Edit 공용)
  const [isCreate, setIsCreate] = useState(false)  // 피드백 생성 입력중인가?
  const [editPublicId, setEditPublicId] = useState<string | null>(null)  // 수정중인 피드백의 public_id

  const navigatePrev = () => {
    navigate(-1)
  }

  const toggleContent = () => {
    setIsCurriculumOpen(!isCurriculumOpen)
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

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleCreateClick = () => {
    setEditPublicId(null)
    setContent("")
    setIsCreate(true)
  }

  const handleCreateSubmit = () => {
    if (content === '') {
      setIsErrorToastOpen(true)
      setErrorToastMessage('피드백을 입력해 주세요.')
      return
    }

    // 피드백 생성 API 호출
    ;(async () => {
      try {
        const tutorFeekbackRequest: PostTutorFeekbackRequest = {
          course_public_id: course_public_id,
          children_public_id: children_public_id,
          content: content
        };
        const tutorFeekbackResponse: PostTutorFeekbackResponse = await RequestApi.tutor.postTutorCourseFeedbacks(tutorFeekbackRequest)

        setCourseFeekbackResponse((prevState: GetTutorFeekbackResponse | undefined) => {
          if (!prevState) return prevState
          return {
            ...prevState,
            course_feedbacks: [
              ...prevState.course_feedbacks,
              tutorFeekbackResponse.course_feedback,
            ],
            is_in_progress: tutorFeekbackResponse.is_in_progress
          }
        })

        setIsCreate(false)
        setTimeout(() => {
          setIsSuccessToastOpen(true)
          setSuccessToastMessage('피드백 생성 성공!')
        }, 100)
      } catch (error: any) {
        setIsCreate(false)
        setTimeout(() => {
          setIsErrorToastOpen(true)
          setErrorToastMessage('피드백 생성 실패!')
        }, 100)
        console.log(error)
      }
    })()
  }

  const handleEditClick = (feedback_public_id: string, content: string) => {
    setEditPublicId(feedback_public_id)
    setContent(content)
  }

  const handleEditSubmit = (feedback_public_id: string) => {
    if (content === '') {
      setIsErrorToastOpen(true)
      setErrorToastMessage('피드백을 입력해 주세요.')
      return
    }
    
    // 피드백 수정 API 호출
    ;(async () => {
      try {
        const tutorFeekbackRequest: PatchTutorFeekbackRequest = {
          course_feedback_public_id: feedback_public_id,
          content: content
        };
        await RequestApi.tutor.patchTutorCourseFeedbacks(tutorFeekbackRequest);

        setCourseFeekbackResponse((prevState: GetTutorFeekbackResponse | undefined) => {
          if (!prevState) return prevState
          return {
            ...prevState,
            course_feedbacks: prevState.course_feedbacks.map(feedback => 
              feedback.public_id === feedback_public_id 
                ? { ...feedback, content: content }
                : feedback
            )
          }
        })

        setEditPublicId(null)
        setTimeout(() => {
          setIsSuccessToastOpen(true)
          setSuccessToastMessage('피드백 수정 성공!')
        }, 100)
      } catch (error: any) {
        setEditPublicId(null)
        setTimeout(() => {
          setIsErrorToastOpen(true)
          setErrorToastMessage('피드백 수정 실패!')
        }, 100)
        console.log(error)
      }
    })()
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        // 피드백 목록 조회 API 호출
        const courseFeekbackResponse = await RequestApi.tutor.getTutorCourseFeedbacks(course_public_id, children_public_id)
        setCourseFeekbackResponse(courseFeekbackResponse)
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
    if (editPublicId) {
      const textarea = document.querySelector('.autoTextarea') as HTMLTextAreaElement  // 단일 개수
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight + 8}px`
      }
    }
  }, [editPublicId])

  useEffect(() => {
    if (courseFeekbackResponse?.is_in_progress === false) {  // 수업 상태: 추가 결제 대기 or 수업 종료
      setIsModalOpen(true);
    }
  }, [courseFeekbackResponse?.is_in_progress]);

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Container>
      <Content>
        <MainContent>
          <StyledArrowBackIcon onClick={navigatePrev} />
          <ChildrenName>
            {children_name} 학생<NoteAltIcon style={{ color: "#0992D0", marginLeft: '5px' }} />
          </ChildrenName>

          <CourseCard>
            <CourseName>{courseFeekbackResponse?.course.name} 수업 - {courseFeekbackResponse?.course.total_week_count}주차</CourseName>
            <FeedbackProgress>
              {courseFeekbackResponse?.course_feedbacks?.length ? (
                courseFeekbackResponse.course_feedbacks.length === courseFeekbackResponse.course.total_week_count ? (
                  '모든 피드백 작성 완료.'
                ) : (
                  `피드백 ${courseFeekbackResponse.course_feedbacks.length}개 작성 완료.`
                )
              ) : (
                '피드백이 아직 없음.'
              )}
            </FeedbackProgress>
            <FeedbackProgressbarSection>
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
                value={courseFeekbackResponse?.course_feedbacks.length}
                step={1}
                marks
                max={courseFeekbackResponse?.course.total_week_count}
                disabled
              />
            </FeedbackProgressbarSection>

            <CourseToggleDivider />
            <CourseToggleButton onClick={toggleContent}>
              {isCurriculumOpen ? (
                <>
                  커리큘럼 닫기&nbsp;<KeyboardDoubleArrowUpIcon style={{ fontSize: '18px' }}></KeyboardDoubleArrowUpIcon>
                </>
              ) : (
                <>
                  커리큘럼 열기&nbsp;<KeyboardDoubleArrowDownIcon style={{ fontSize: '18px' }}></KeyboardDoubleArrowDownIcon>
                </>
              )}
            </CourseToggleButton>

            <CourseToggleContent isOpen={isCurriculumOpen}>
              <br />
              <CourseToggleMainContent>
                <CourseImage src={courseFeekbackResponse?.course.thumbnail} />
                {courseFeekbackResponse?.course.curriculum}
              </CourseToggleMainContent>
            </CourseToggleContent>
          </CourseCard>
          
          <SectionTitle>
            수업 피드백
            {isCreate ? (
              <span>
                <CustomCreateButton
                  onClick={() => setIsCreate(false)}
                  backgroundColor='darkgray'
                  text={<><CloseIcon style={{ fontSize: '15px' }} />&nbsp;취소</>}
                />
                &nbsp;
                <CustomCreateButton
                  onClick={() => {handleCreateSubmit()}}
                  backgroundColor='green'
                  text={<><CheckIcon style={{ fontSize: '15px' }} />&nbsp;저장</>}
                />
              </span>
            ) : (courseFeekbackResponse &&
                  courseFeekbackResponse.is_in_progress &&
                    <CustomCreateButton
                      onClick={() => handleCreateClick()}
                      backgroundColor="#0992D0"
                      text={<><AddIcon style={{ fontSize: '15px' }} />&nbsp;추가</>}
                    />
            )}
          </SectionTitle>

          <FeedbackCardContainer>
            {isCreate &&
              <FeedbackCard style={{ border: 'dashed 3px green', boxShadow: 'none', borderRadius: '8px' }}>
                <FeedbackTitle>
                  New - {courseFeekbackResponse?.course_feedbacks?.length ? courseFeekbackResponse.course_feedbacks.length + 1 : 1}번째 수업
                </FeedbackTitle>
                <CourseToggleDivider />
                <FeedbackInputBox className="autoTextarea" name="content" value={content} onChange={handleContentChange} onKeyUp={handleResizeKeyUp} />
              </FeedbackCard>
            }
            {courseFeekbackResponse?.course_feedbacks && courseFeekbackResponse.course_feedbacks.length > 0 ? (
              courseFeekbackResponse.course_feedbacks.map((feedback: CourseFeedbackListSchema, index: number) => (
                <FeedbackCard key={feedback.public_id}>
                  <FeedbackTitle>
                    {index + 1}번째 수업
                    {feedback.public_id === editPublicId ? (
                      <span>
                        <CustomEditButton
                          onClick={() => setEditPublicId(null)}
                          backgroundColor='darkgray'
                          text={<><CloseIcon style={{ fontSize: '15px' }} />&nbsp;취소</>}
                        />
                        &nbsp;
                        <CustomEditButton
                          onClick={() => handleEditSubmit(feedback.public_id)}
                          backgroundColor='green'
                          text={<><CheckIcon style={{ fontSize: '15px' }} />&nbsp;저장</>}
                        />
                      </span>
                    ) : (
                      <CustomEditButton
                        onClick={() => handleEditClick(feedback.public_id, feedback.content)}
                        backgroundColor='darkgray'
                        text={<><EditIcon style={{ fontSize: '15px' }} />&nbsp;수정</>}
                      />
                    )}
                  </FeedbackTitle>
                  <CourseToggleDivider />
                  {feedback.public_id === editPublicId ? (
                    <FeedbackInputBox className="autoTextarea" name="content" value={content} onChange={handleContentChange} onKeyUp={handleResizeKeyUp} />
                  ) : (
                    <FeedbackViewBox>{feedback.content}</FeedbackViewBox>
                  )}
                </FeedbackCard>
              ))
            ) : (
              <FeedbackCard>
                <FeedbackCardNoneText>최근 수업 없음</FeedbackCardNoneText>
              </FeedbackCard>
            )}
          </FeedbackCardContainer>
        </MainContent>

        <Copyright>Copyright © CodingBada All Rights Reserved.</Copyright>
      </Content>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContainer>
          <ErrorIcon style={{ color: '#df1212', fontSize: '40px', marginBottom: '15px' }} />
          <ModalTitle>피드백 종료</ModalTitle>
          <ModalMessage>
            {courseFeekbackResponse &&
              courseFeekbackResponse.course_feedbacks.length < courseFeekbackResponse.course.total_week_count ? 
              "추가 결제 대기 중입니다." : "수업이 종료되었습니다."
            }<br />
            본 페이지까지만 수정이 가능합니다.<br />
            피드백 정리를 마무리 해주세요.
          </ModalMessage>
          <CustomCreateButton
            onClick={() => setIsModalOpen(false)}
            backgroundColor="#df1212"
            text={"확인"}
          />
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

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const MainContent = styled.div`
  flex-grow: 1;
  position: relative;
`

const StyledArrowBackIcon = styled(ArrowBackIcon)`
  position: absolute;
  top: 5px;
  left: 0px;
  color: #474646;
  cursor: pointer;

  &:hover {
    color: #100f0f;
  }
`;
const ChildrenName = styled.div`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
  font-size: 22px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const CourseCard = styled(Card)`
  margin-bottom: 30px;
  width: 100%;
  padding: 15px 20px;
  border: solid 4px skyblue;
  box-shadow: none;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const CourseName = styled.div`
  margin-bottom: 6px;
  margin-top: 9px;
  width: 100%;
  font-weight: bold;
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FeedbackProgress = styled.div`
  margin-bottom: 7px;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
`
const FeedbackProgressbarSection = styled.div`
  padding: 0 10px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`

const CourseToggleDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px dashed lightgray;
  margin: 15px 0;
`
const CourseToggleButton = styled.div`
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
const CourseToggleContent = styled.div<{ isOpen: boolean }>`
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
  white-space: pre-wrap;
`
const CourseToggleMainContent = styled.div`
  margin-bottom: 15px;
  padding: 28px 21px;
  border-radius: 10px;
  background-color: #f3f1f1;
  font-size: 15px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CourseImage = styled.img`
  margin-bottom: 30px;
  width: 87%;
  height: 87%;
  object-fit: cover;
  opacity: 0.8;
  border-radius: 7px;
`

const SectionTitle = styled.div`
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const FeedbackCardContainer = styled.div`
  margin-bottom: 20px;
`
const FeedbackCard = styled(Card)`
  margin-bottom: 9px;
  width: 100%;
  height: auto;
  padding: 18px;
  white-space: pre-wrap;
`
const FeedbackTitle = styled.div`
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const FeedbackViewBox = styled.div`
  padding: 10px;
  width: 100%;
  height: auto;
  border: none;
  box-sizing: border-box;
`
const FeedbackInputBox = styled.textarea`
  padding: 10px;
  width: 100%;
  border: 1px solid darkgray;
  background-color: #f3f1f1;
  border-radius: 4px;
  resize: none;
  box-sizing: border-box;
`
const FeedbackCardNoneText = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 17px;
  color: var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  color: #868e96;
  padding: 20px 0 10px;
  margin-top: auto;

  font-size: 12px;
`

const ModalContainer = styled(Paper)`
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 380px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
const ModalMessage = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
`;