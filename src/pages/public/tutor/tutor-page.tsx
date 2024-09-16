import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { TextareaAutosize } from '@mui/base'
import { useToastClear } from '@hooks'
import { useEffect, useState } from 'react'
import { GetTutorDetailResponse, RequestApi } from '@api'
import { Helmet } from 'react-helmet-async'

export function TutorIntroductionPage() {
  useToastClear()
  const navigate = useNavigate()
  const { publicId } = useParams()
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false)
  const [tutor, setTutor]: [GetTutorDetailResponse | undefined, Function] = useState()

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(true)
    ;(async () => {
      try {
        const tutor = await RequestApi.tutor.getTutor(publicId as string)
        setTutor(tutor)
        setIsLoading(false)
      } catch (error: any) {
        setIsLoading(false)
        navigate('/')
      }
    })()
  }, [navigate, publicId])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Container>
      <Helmet>
        <title>{`코딩바다 강사소개서 - ${tutor?.nickname} (${tutor?.korean_nickname})`}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`코딩바다 강사소개서`} />
        <meta property="og:description" content={`안녕하세요. 코딩바다의 ${tutor?.nickname} (${tutor?.korean_nickname})입니다.`} />
        <meta property="og:image" content={tutor?.profile_image} />
      </Helmet>

      <Content>
        <HeadLine>
          <MainLogo>
            <Icon src={'/assets/landing/codingbada-logo.png'} alt="codingbada-logo" />
            코딩바다 강사소개서
          </MainLogo>
        </HeadLine>

        <Header>
          <ProfileImageSection>
            <ProfileImage src={tutor?.profile_image} />
          </ProfileImageSection>

          <DescriptionSection>
            <DescriptionName>
              {tutor?.nickname}
              <DescriptionKoreanName>({tutor?.korean_nickname})</DescriptionKoreanName>
            </DescriptionName>

            <DescriptionField>{tutor?.email}</DescriptionField>
            <DescriptionField>{tutor?.phone_number}</DescriptionField>
            <DescriptionField>{tutor?.address}</DescriptionField>
          </DescriptionSection>
        </Header>

        <Title>학력사항</Title>
        <Description readOnly value={tutor?.university} />

        <Title>활동경력</Title>
        <Description readOnly value={tutor?.activity} />

        <Title>자기소개</Title>
        <Description readOnly value={tutor?.introduction} />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    height: auto;
  }
`

const Content = styled.div`
  padding: 60px 60px 0;
  width: 770px;
  height: 100%;
  background-color: #f8f9fa;

  @media (max-width: 600px) {
    padding: 20px 30px 40px;
    width: 100%;
    height: auto;
  }
`

const HeadLine = styled.div`
  height: 50px;
  display: flex;
  margin-bottom: 20px;
`

const MainLogo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  color: var(--main-color);
`
const Icon = styled.img`
  margin-right: 10px;
  margin-bottom: 5px;
  width: 40px;
`

const Header = styled.div`
  display: flex;
  width: 680px;
  margin-left: -60px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 60px;
  height: 230px;
  border-radius: 0 30px 30px 0;
  background-color: #e6f4fa;

  @media (max-width: 600px) {
    margin-left: -30px;
    padding-left: 30px;
    width: 93vw;
    height: 200px;
  }
`

const ProfileImageSection = styled.div`
  border-radius: 10px;
  margin-right: 40px;
  width: 140px;
  height: 100%;
  background-color: white;

  @media (max-width: 600px) {
    width: 110px;
    margin-right: 20px;
  }
`
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const DescriptionSection = styled.div``

const DescriptionName = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
  font-size: 40px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid black;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 25px;
    margin-bottom: 10px;
    padding-bottom: 7px;
  }
`
const DescriptionKoreanName = styled.div`
  margin-left: 10px;
  margin-bottom: 8.5px;
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 600px) {
    margin-left: 0;
    font-size: 16px;
    margin-bottom: 0;
  }
`
const DescriptionField = styled.div`
  margin-bottom: 5px;
  font-size: 18px;
  color: var(--gray-color);

  @media (max-width: 600px) {
    font-size: 12px;
  }
`

const Title = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: flex-end;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`
const Description = styled(TextareaAutosize)`
  margin-top: 10px;
  color: var(--gray-color);
  background-color: #f8f9fa;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
`
