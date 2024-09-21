import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'

export const FreeTestBottomSheet = forwardRef((props, ref: any) => {
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '1280px', cursor: 'pointer' }}>
          <CloseIcon onClick={() => setIsVisible(false)} style={{ fontSize: '35px', color: 'var(--gray-color)' }} />

          <Title>무료수업 이벤트 진행중!</Title>

          <div>
            <DescriptionSection>
              <Description>
                자녀분의 코딩 교육을 <span style={{ fontWeight: 'bold', color: 'red' }}>지금 무료</span>로 받아보세요. 🎉
              </Description>
            </DescriptionSection>

            <SubDescriptionSection>
              <SubDescription>테스트 수업은 상담 후 스케줄이 조율되며, 일정은 선착순이므로 너른 양해 부탁드립니다.</SubDescription>

              <SubDescription style={{ paddingTop: '5px', fontSize: '14px' }}>※ 자녀분 한 명당 한 번만 가능합니다.</SubDescription>
            </SubDescriptionSection>
          </div>

          <Button
            sx={{ width: '130px', height: '60px', fontSize: '20px', borderRadius: '70px' }}
            variant="contained"
            onClick={handleApplyButtonClick}
          >
            신청하기
          </Button>
        </div>
      </Content>
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
  width: 100%;
  min-width: 1280px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160px;
  background-color: white;
  box-shadow: 0 13px 16px 12px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 1000;
  animation: ${slideUp} 2s cubic-bezier(0.22, 1, 0.36, 1);
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3% 10px 3%;
`

const Title = styled.div`
  font-weight: 900;
  font-size: 50px;
  color: red;

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
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  background-color: #0892d0;
  letter-spacing: 0.5px;
`
