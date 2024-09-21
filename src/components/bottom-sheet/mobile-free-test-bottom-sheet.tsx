import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, useState } from 'react'

export const MobileFreeTestBottomSheet = forwardRef((props, ref: any) => {
  const [isVisible, setIsVisible]: [boolean, Function] = useState(true)

  if (!isVisible) {
    return null
  }

  const handleApplyButtonClick = () => {
    setIsVisible(false)
    ref.current.focus()
  }

  return (
    <Container>
      <Content>
        <Title>무료수업 이벤트!</Title>

        <DescriptionSection>
          <Description>자녀분의 코딩 교육을</Description>
          <Description>
            <span style={{ fontWeight: 'bold', color: 'red' }}>지금 무료</span>로 받아보세요. 🎉
          </Description>
        </DescriptionSection>

        <SubDescriptionSection>
          <SubDescription>테스트 수업은 상담 후 스케줄이 조율되며,</SubDescription>
          <SubDescription>일정은 선착순이므로 너른 양해 부탁드립니다.</SubDescription>
          <SubDescription style={{ paddingTop: '5px', fontSize: '14px' }}>※ 자녀분 한 명당 한 번만 가능합니다.</SubDescription>
        </SubDescriptionSection>
      </Content>

      <ButtonSection>
        <CloseButton onClick={() => setIsVisible(false)}>닫기</CloseButton>
        <ApplyButton onClick={handleApplyButtonClick}>신청하기</ApplyButton>
      </ButtonSection>
    </Container>
  )
})

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background-color: white;
  box-shadow: 0 13px 16px 12px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  z-index: 1000;
  animation: ${slideUp} 2s cubic-bezier(0.22, 1, 0.36, 1);
`
const Content = styled.div`
  padding: 30px 30px 0;
`
const Title = styled.div`
  font-weight: 900;
  font-size: 40px;
  color: red;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
`

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`
const Description = styled.div`
  font-size: 22px;
`

const SubDescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`
const SubDescription = styled.div`
  font-size: 16px;
  color: var(--gray-color);
`

const ButtonSection = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  border-top: 1px solid #e9ecef;
`
const CloseButton = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e9ecef;
  font-weight: bold;
  font-size: 18px;
  color: var(--gray-color);
  letter-spacing: 0.5px;
`
const ApplyButton = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  background-color: #0892d0;
  letter-spacing: 0.5px;
`
