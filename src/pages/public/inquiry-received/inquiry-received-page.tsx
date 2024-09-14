import { postInquiryResponse } from '@api'
import styled from '@emotion/styled'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useToastClear } from '@hooks'
import { postInquiryResponseState } from '@store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { useMediaQuery } from '@mui/material'
import confetti from 'canvas-confetti'

export function InquiryReceivedPage() {
  useToastClear()
  const navigate = useNavigate()
  const postInquiryResponse: postInquiryResponse = useRecoilValue(postInquiryResponseState)

  const isMaxWidth600px = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    if (postInquiryResponse.phone_number === '') {
      navigate('/')
    }

    confetti({
      particleCount: isMaxWidth600px ? 100 : 300,
      spread: isMaxWidth600px ? 70 : 1000,
      origin: isMaxWidth600px ? { x: 0.5, y: 0.5 } : { x: 0.5, y: 0.2 },
    })
  }, [navigate, postInquiryResponse])

  return (
    <Container>
      <ContainerContent>
        <LogoSection>
          <MainLogo>
            <Icon src={'./assets/landing/codingbada-logo.png'} alt="codingbada-logo" />
            코딩바다
          </MainLogo>
        </LogoSection>
        <DescriptionSection>
          <Description1>상담 신청해 주셔서 감사합니다. 🙇‍♂️</Description1>
          <Description2>가능한 빠르게 연락드릴 수 있도록,</Description2>
          <Description3>최선을 다할 테니 조금만 기다려주세요!</Description3>
        </DescriptionSection>

        <PhoneNumberSection>
          <PhoneNumberTitle>전화번호</PhoneNumberTitle>
          <PhoneNumberContent value={postInquiryResponse.phone_number} disabled />
        </PhoneNumberSection>

        <ContentSection>
          <ContentTitle>문의 내용</ContentTitle>
          <ContentContent
            multiline
            value={postInquiryResponse.content}
            disabled
            inputProps={{
              style: {
                height: isMaxWidth600px ? '100px' : '200px',
                overflow: 'auto',
              },
            }}
          />
        </ContentSection>

        <InquiryId>접수 ID : {postInquiryResponse.public_id}</InquiryId>

        <HomeButtonSection>
          <HomeButton onClick={() => navigate('/')} variant="contained">
            돌아가기
          </HomeButton>
        </HomeButtonSection>
      </ContainerContent>
    </Container>
  )
}

const Container = styled.div`
  padding: 100px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 60px 20px;
  }
`
const ContainerContent = styled.div`
  width: 430px;

  @media (max-width: 600px) {
    width: 300px;
  }
`
const LogoSection = styled.div`
  display: flex;
  justify-content: center;
`
const MainLogo = styled.div`
  font-weight: bold;
  font-size: 50px;
  color: var(--main-color);

  @media (max-width: 600px) {
    font-size: 40px;
  }
`
const Icon = styled.img`
  margin-right: 10px;
  width: 70px;

  @media (max-width: 600px) {
    width: 57px;
  }
`

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Description1 = styled.div`
  padding-top: 30px;
  font-weight: bold;
  font-size: 30px;

  @media (max-width: 600px) {
    padding-top: 20px;
    font-size: 20px;
  }
`
const Description2 = styled.div`
  padding-top: 20px;
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 600px) {
    padding-top: 10px;
    font-size: 17px;
  }
`
const Description3 = styled.div`
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 600px) {
    font-size: 17px;
  }
`

const PhoneNumberSection = styled.div`
  padding-top: 30px;

  @media (max-width: 600px) {
    padding-top: 20px;
  }
`
const PhoneNumberTitle = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
`
const PhoneNumberContent = styled(TextField)`
  width: 100%;
`

const ContentSection = styled.div`
  width: 100%;
  padding-top: 30px;

  @media (max-width: 600px) {
    padding-top: 20px;
  }
`
const ContentTitle = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
`
const ContentContent = styled(TextField)`
  width: 100%;
`
const InquiryId = styled.div`
  padding-top: 30px;
  color: var(--gray-color);

  @media (max-width: 600px) {
    font-size: 12px;
  }
`
const HomeButtonSection = styled.div`
  width: 100%;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  padding-bottom: 60px;
`
const HomeButton = styled(Button)`
  height: 40px;
`
