import { useNavigate } from 'react-router-dom'
import { CourseListSchema, GenderType, GetParentDetailResponse, LocalStorageKey, RequestApi } from '@api'
import styled from '@emotion/styled'
import { useToastClear } from '@hooks'
import Face3Icon from '@mui/icons-material/Face3'
import FaceIcon from '@mui/icons-material/Face'
import { Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { accountTokenState } from '@store'
import Slider, { SliderThumb } from '@mui/material/Slider'

export function ParentMainPage() {
  useToastClear()
  const navigate = useNavigate()
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false)
  const [parentDetailResponse, setParentDetailResponse]: [GetParentDetailResponse | undefined, Function] = useState()
  const setAccountToken: SetterOrUpdater<string | null> = useSetRecoilState(accountTokenState)

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
        <ClassCard key={`course-${index}`}>
          <ClassImage src={course.thumbnail} />
        </ClassCard>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 90px 30px 60px;

  background-color: #f8f9fa;
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
`
const ClassImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
