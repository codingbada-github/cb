import styled from '@emotion/styled'

export function Footer() {
  return (
    <Container>
      <Content>
        <div style={{ fontWeight: 'bold', paddingBottom: '7px' }}>코딩바다</div>
        <div>Copyright © CodingBada All Rights Reserved.</div>
        <br />
        <div>호스팅 사업자 : Amazon Web Services (AWS)</div>

        <Icons>
          <Icon src={'./assets/landing/instagram-icon.svg'} alt="instagram-icon" />
          <Icon src={'./assets/landing/naver-blog-icon.svg'} alt="naver-blog-icon" />
          <Icon src={'./assets/landing/tistory-icon.svg'} alt="tistory-icon" />
        </Icons>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  background-color: #f8f9fa;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #868e96;
  font-size: 14px;
`
const Icons = styled.div`
  margin-top: 20px;
  width: 100px;
  display: flex;
  justify-content: space-between;
`

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`
