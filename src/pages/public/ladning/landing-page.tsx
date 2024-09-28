import { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { TextareaAutosize } from '@mui/base'
import Marquee from 'react-marquee-slider'

import { useSetRecoilState, SetterOrUpdater } from 'recoil'
import InputMask from 'react-input-mask'

import { useToastClear } from '@hooks'
import { isErrorToastOpenState, errorToastMessageState, postInquiryResponseState } from '@store'

import { DebouncedButton, Footer, FreeTestBottomSheet } from '@components'
import { RequestApi, PostInquiryResponse } from '@api'
import { useNavigate } from 'react-router-dom'

const reviewList2 = [
  {
    description:
      '"그동안 아이에게 좋은 스승이 되어 주셔서 너무 감사합니다. 그만하게 되어 아이가 많이 섭섭해하네요. 앞날에 좋은 일만 있었으면 좋겠고 진심으로 감사드립니다."',
    name: '- 중등부 3학년 신OO 어머님',
  },
  {
    description:
      '"주위 친구들이 하도 전부 코딩 코딩 한다길래 시켜봤더니 확실히 좋은 경험이었네요. 게임만 하는 것 같아 속상했는데 이제 컴퓨터로 프로그래밍을 하니까 마음이 놓이네요. 많은 도움됐어요"',
    name: '- 고등부 1학년 민OO 어머님',
  },
  {
    description:
      '"코딩이 중요한건알겠는데 관련한지식이 없으니... 교육을 어떻게 해야하나 막막했는데... 덕분에 미래에 대한 준비를 할수있었네요.. 고맙습니다..."',
    name: '- 중등부 1학년 김OO 어머님',
  },
  {
    description:
      '"우리 아이가 대학교 컴퓨터 공학과에 진학하겠다고 하네요. 미래에 유망한 학과인만큼 잘 선택한거 같아요. 그동안 여러모로 가르쳐주신 것들 감사했습니다 ㅎㅎ~"',
    name: '- 고등부 3학년 신OO 어머님',
  },
]

const reviewList3 = [
  {
    description: '"코딩도 코딩인데 무엇보다 애와 잘 놀아주셔서 까탈스럽지 않게 교육 잘받을수있었어요. 그동안 친구처럼 잘 대해주셔서 정말좋았어요~"',
    name: '- 중등부 2학년 이OO 어머님',
  },
  {
    description:
      '"선생님이 제 아이수준에 맞추어 커리큘럼을 조정해주셔서 부담 없이 맡길 수 있었습니다 어려웠던 코딩이 이제는 재미있다고 하네요. 고마워요"',
    name: '- 고등부 2학년 서OO 아버님',
  },
  {
    description: '"그동안 수업하느라 고생하셨습니다. 정말 고마워요 기프티콘은 감사의 표시에요. ^^"',
    name: '- 중등부 1학년 김OO 아버님',
  },
  {
    description:
      '"강의때 추천해준 자료들 보면서 스스로 공부하고 무언가를 찾아보네요. 무엇보다 혼자서 해보려고 하는 습관을 생기게 해줘서 정말 고맙습니다"',
    name: '- 고등부 3학년 박OO 어머님',
  },
]

const CONTENT_MAX_LENGTH: number = 1000

export function LandingPage() {
  useToastClear()
  const inputFieldRef = useRef(null)

  const navigate = useNavigate()
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setPostInquiryResponse: SetterOrUpdater<PostInquiryResponse> = useSetRecoilState(postInquiryResponseState)

  const [phoneNumber, setPhoneNumber]: [string, Function] = useState('')
  const [content, setContent]: [string, Function] = useState('')

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= CONTENT_MAX_LENGTH) {
      setContent(event.target.value)
    }
  }

  const handleCsButtonClick = (type: number = 1) => {
    if (phoneNumber.length !== 13) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('올바른 전화번호를 입력해 주세요!')
      return
    }

    ;(async () => {
      try {
        const response = await RequestApi.inquiry.postInquiry({
          phone_number: phoneNumber,
          content: type === 1 ? (content ? content : '무료 상담신청') : '커리큘럼 상담신청',
        })

        setPostInquiryResponse(response)
        setPhoneNumber('')
        setContent('')

        navigate('/inquiry-received')
      } catch (error: any) {
        setIsErrorToastOpen(true)
        setErrorToastMessage('죄송합니다. 잠시 후 다시 시도해 주세요.')
      }
    })()
  }

  return (
    <Container>
      <PageContainer>
        <FirstPageContent>
          <FirstPageTypo>
            <FirstPageTypo1>코딩바다</FirstPageTypo1>
            <FirstPageTypo2Section>
              <FirstPageTypo2>우리 아이의 미래를 위한,</FirstPageTypo2>
              <FirstPageTypo2>코딩 교육의 시작.</FirstPageTypo2>
            </FirstPageTypo2Section>
            <FirstPageTypo3>2025년 코딩 의무 교육, 이미 시작된 S/W, AI 시대</FirstPageTypo3>
            <FirstPageTypo3>더 이상 선택이 아니라 필수인 코딩 교육 시작하셔야 합니다.</FirstPageTypo3>
          </FirstPageTypo>

          <FirstPageCsForm>
            <CsForm>
              <CsFormTitle>✅ 지금 바로 상담을 받아보세요!</CsFormTitle>

              <CsFormField>
                <InputMask value={phoneNumber} onChange={handlePhoneNumberChange} mask="999-9999-9999" maskPlaceholder={null}>
                  <CsFormTextField inputRef={inputFieldRef} type="tel" label="전화번호" variant="outlined" />
                </InputMask>

                <TextArea
                  value={content}
                  onChange={handleContentChange}
                  style={{ marginTop: '20px', height: '70%' }}
                  placeholder="자녀의 나이 코딩, 코딩 경험 유무 등을 남겨주시면, 친절하고 상세하게 도와드리겠습니다."
                />
              </CsFormField>

              <DebouncedButton
                onClick={() => handleCsButtonClick()}
                sx={{ height: '50px', fontSize: '20px' }}
                variant="contained"
                text={'상담신청'}
              />
            </CsForm>
          </FirstPageCsForm>
        </FirstPageContent>
      </PageContainer>

      <PageContainer style={{ backgroundColor: '#e6f4fa' }}>
        <PageContent style={{ padding: '60px 0' }}>
          <PageTitle>코딩바다는 교육의 힘을 믿습니다.</PageTitle>

          <div style={{ paddingTop: '40px', paddingBottom: '50px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <ContentCard>
              <div style={{ paddingBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>1. 잘 아는 것과, 잘 가르치는 것</div>

              <div>대다수의 부모님들이 누가, 어떻게 커리큘럼을 만들었는지도 모른 채,</div>
              <div>소중한 시간과 돈을 들여 우리 아이들을 맡기고 있습니다.</div>
              <br />
              <div>저희 코딩바다는 이러한 부모님들의 신뢰를 저버리지 않겠습니다.</div>
              <div>국내 유수의 대기업 및 IT 업계 출신의 전문가들이 만든 커리큘럼을 믿어보세요.</div>
              <br />
              <div>비단, 공인된 커리큘럼뿐만이 아닙니다.</div>
              <div>잘 아는 것과, 잘 가르치는 것은 다릅니다.</div>
              <br />
              <div>아무리 천재적인 석학일지라도, 최고의 지식과 경험을 갖추고 있을지라도,</div>
              <div>누군가를 가르치고 알려주는 교육의 역량은 전혀 다른 문제입니다.</div>
              <br />
              <div>저희 코딩바다는 교육의 자세와 태도가 갖추어진 IT 전공 강사를 양성하고,</div>
              <div>소중한 자녀 분에게 적합한 1:1 강사를 매칭해 드리겠습니다.</div>
            </ContentCard>

            <ContentCard>
              <div style={{ paddingBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>2. 교육이 시간과 장소에 구애받지 않도록</div>

              <div>교육이 필요한 누구나 쉽게 접근할 수 있도록,</div>
              <div>코딩바다는 100% 온라인 교육을 지향합니다.</div>
              <br />
              <div>코로나를 거치며, 원격 교육이 활성화된 요새 트렌드에 맞추어,</div>
              <div>노트북과 컴퓨터만 있다면 언제 어디서나 교육이 가능합니다.</div>
              <br />
              <div style={{ color: 'var(--gray-color)' }}>※ 데스크톱의 경우 원활한 의사소통을 위해 웹캠 및 스피커가 있어야 합니다.</div>
              <div style={{ color: 'var(--gray-color)' }}>※ 오프라인 수업은 최대한 지양하고 있지만, 상담을 통해 협의 가능합니다.</div>
            </ContentCard>
          </div>

          <div style={{ height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ paddingBottom: '30px', fontWeight: 'bold', fontSize: '20px' }}>
              <u>코딩바다 대표 강사진 출신 회사</u>
            </div>
            <LogoSection>
              <LogoDiv>
                <Logo src={'/assets/landing/cj-logo.svg'} alt="cj" />
              </LogoDiv>
              <LogoDiv>
                <Logo src={'/assets/landing/daangn-logo.svg'} alt="daangn" />
              </LogoDiv>
              <LogoDiv>
                <Logo src={'/assets/landing/hyundai-logo.svg'} alt="hyundai" />
              </LogoDiv>
              <LogoDiv>
                <Logo src={'/assets/landing/gs-logo.svg'} alt="gs" />
              </LogoDiv>
              <LogoDiv>
                <Logo src={'/assets/landing/socar-logo.svg'} alt="socar" />
              </LogoDiv>
            </LogoSection>
          </div>
        </PageContent>
      </PageContainer>

      <PageContainer>
        <PageContent style={{ padding: '60px 0' }}>
          <PageTitle>검증된 커리큘럼</PageTitle>
          <div style={{ color: 'var(--gray-color)', fontSize: '20px' }}>Scratch? Python? Java? 알고리즘? AI? 뭐가 뭐야?!</div>
          <div style={{ paddingBottom: '50px', color: 'var(--gray-color)', fontSize: '20px' }}>
            약은 약사에게 코딩 교육은 코딩바다에게 그저 믿고 맏겨만 주세요.
          </div>

          <CurriculumSection>
            <CurriculumDiv>
              <CurriculumTitle>
                <CurriculumTitleHighlight titleHighlightColor={'#ffcccc'}>초등부</CurriculumTitleHighlight>
              </CurriculumTitle>

              <CurriculumDescription>
                <div>초등부는 무엇보다 아이들의 흥미가 중요합니다.</div>
                <div>어렵고 복잡한 프로그래밍 언어가 아닌,</div>
                <div>블록을 옮기며 쉽게 코딩하는 Scratch를 활용하게 됩니다.</div>
                <br />
                <div>비단, 단순히 재미만을 추구하는 것이 아닌,</div>
                <div>이 시기에 가장 중요한 창의력과 사고력을 증진시키기 위해</div>
                <div>자체적으로 제작한 과제를 해결해 가며,</div>
                <div>자녀분들이 스스로 사고할 수 있는 힘을 기르게 됩니다.</div>
              </CurriculumDescription>

              <CurriculumPriceDiscountSection>
                <CurriculumPriceDiscountBadge>첫 달 할인</CurriculumPriceDiscountBadge>
                <CurriculumOriginPrice>120,000₩</CurriculumOriginPrice>
              </CurriculumPriceDiscountSection>
              <CurriculumPrice>90,000₩</CurriculumPrice>
            </CurriculumDiv>
            <CurriculumDiv>
              <CurriculumTitle>
                <CurriculumTitleHighlight titleHighlightColor={'#ccffcc'}>중등부</CurriculumTitleHighlight>
              </CurriculumTitle>

              <CurriculumDescription>
                <div>중등부는 아이들의 잠재력이 만개하는 시기입니다.</div>
                <div>이 시기에 학습을 통해 발달된 사고력이 평생을 가게 되며,</div>
                <div>앞으로의 문제 해결 능력을 좌지우지하게 됩니다.</div>
                <br />
                <div>따라서, 자녀분들의 논리력과 수학적 사고력을 함양시키는</div>
                <div>교육자료들로 커리큘럼이 구성되어 있습니다. </div>
                <div>또한, 요새 화두로 떠오르는 AI / 인공지능의 기반 스킬인</div>
                <div>Python을 배우고 활용할 줄 알게 됩니다.</div>
              </CurriculumDescription>

              <CurriculumPriceDiscountSection>
                <CurriculumPriceDiscountBadge>첫 달 할인</CurriculumPriceDiscountBadge>
                <CurriculumOriginPrice>140,000₩</CurriculumOriginPrice>
              </CurriculumPriceDiscountSection>
              <CurriculumPrice>110,000₩</CurriculumPrice>
            </CurriculumDiv>
            <CurriculumDiv>
              <CurriculumTitle>
                <CurriculumTitleHighlight titleHighlightColor={'#ccccff'}>고등부</CurriculumTitleHighlight>
              </CurriculumTitle>

              <CurriculumDescription>
                <div>고등부는 곧 대학 입시를 앞둔 중요한 시기입니다.</div>
                <div>이 시기에는 인생의 진로를 찾고 결정하는 것이,</div>
                <div>최우선 순위이며 인생에서 가장 큰 선택이 될 것입니다.</div>
                <br />
                <div>고등부 수업은 IT 관련 학과 지망 학생들의 경우,</div>
                <div>코딩이 적성에 맞는지 미리 경험해 보는 발판이 될 것이고,</div>
                <div>문과 및 예체능 계열 학생들의 경우,</div>
                <div>앞으로 대학, 회사에서 기본으로 갖추어야 할 코딩 능력을 기르게 됩니다.</div>
              </CurriculumDescription>

              <CurriculumPriceDiscountSection>
                <CurriculumPriceDiscountBadge>첫 달 할인</CurriculumPriceDiscountBadge>
                <CurriculumOriginPrice>160,000₩</CurriculumOriginPrice>
              </CurriculumPriceDiscountSection>
              <CurriculumPrice>130,000₩</CurriculumPrice>
            </CurriculumDiv>
          </CurriculumSection>

          <CurriculumCsSection>
            <CurriculumCsForm>
              <CurriculumCsFormDescription>간단하게 연락처로 상담부터 받아보세요!</CurriculumCsFormDescription>
              <CurriculumCsFormFields>
                <InputMask value={phoneNumber} onChange={handlePhoneNumberChange} mask="999-9999-9999" maskPlaceholder={null}>
                  <TextField style={{ width: '300px', height: '55px', marginRight: '10px' }} type="tel" label="전화번호" variant="outlined" />
                </InputMask>
                <DebouncedButton
                  onClick={() => handleCsButtonClick(2)}
                  sx={{ height: '55px', fontSize: '20px' }}
                  variant="contained"
                  text={'상담신청'}
                />
              </CurriculumCsFormFields>
            </CurriculumCsForm>
          </CurriculumCsSection>
        </PageContent>
      </PageContainer>

      <ReviewPageContainer style={{ backgroundColor: '#e6f4fa' }}>
        <PageContent style={{ padding: '60px 0' }}>
          <ReviewPageTitle>소중한 부모님들의 후기</ReviewPageTitle>

          <TempReviewSection>
            <Marquee direction="ltr" velocity={15} scatterRandomly={false} onFinish={() => {}} resetAfterTries={200} onInit={() => {}}>
              {reviewList2.map((item: any, index: number) => {
                return (
                  <TempReviewListItem key={`review2-${index}`}>
                    <ReviewListItemDescription>{item.description}</ReviewListItemDescription>
                    <ReviewListItemName>{item.name}</ReviewListItemName>
                  </TempReviewListItem>
                )
              })}
            </Marquee>
          </TempReviewSection>

          <TempReviewSection>
            <Marquee direction="rtl" velocity={15} scatterRandomly={false} onFinish={() => {}} resetAfterTries={200} onInit={() => {}}>
              {reviewList3.map((item: any, index: number) => {
                return (
                  <TempReviewListItem key={`review3-${index}`}>
                    <ReviewListItemDescription>{item.description}</ReviewListItemDescription>
                    <ReviewListItemName>{item.name}</ReviewListItemName>
                  </TempReviewListItem>
                )
              })}
            </Marquee>
          </TempReviewSection>

          {/* <ReviewSection>
            <ReviewTitle>초등부</ReviewTitle>
            <Marquee direction="rtl" velocity={15} scatterRandomly={false} onFinish={() => {}} resetAfterTries={200} onInit={() => {}}>
              {reviewList1.map((item: any, index: number) => {
                return (
                  <ReviewListItem key={`review1-${index}`}>
                    <ReviewListItemDescription>{item.description}</ReviewListItemDescription>
                    <ReviewListItemName>{item.name}</ReviewListItemName>
                  </ReviewListItem>
                )
              })}
            </Marquee>
          </ReviewSection>

          <ReviewSection>
            <ReviewTitle>중등부</ReviewTitle>
            <Marquee direction="ltr" velocity={15} scatterRandomly={false} onFinish={() => {}} resetAfterTries={200} onInit={() => {}}>
              {reviewList2.map((item: any, index: number) => {
                return (
                  <ReviewListItem key={`review2-${index}`}>
                    <ReviewListItemDescription>{item.description}</ReviewListItemDescription>
                    <ReviewListItemName>{item.name}</ReviewListItemName>
                  </ReviewListItem>
                )
              })}
            </Marquee>
          </ReviewSection>

          <ReviewSection>
            <ReviewTitle>고등부</ReviewTitle>
            <Marquee direction="rtl" velocity={15} scatterRandomly={false} onFinish={() => {}} resetAfterTries={200} onInit={() => {}}>
              {reviewList3.map((item: any, index: number) => {
                return (
                  <ReviewListItem key={`review3-${index}`}>
                    <ReviewListItemDescription>{item.description}</ReviewListItemDescription>
                    <ReviewListItemName>{item.name}</ReviewListItemName>
                  </ReviewListItem>
                )
              })}
            </Marquee>
          </ReviewSection> */}
        </PageContent>
      </ReviewPageContainer>

      <Footer />
      <FreeTestBottomSheet ref={inputFieldRef} />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 80px; // header height
  min-width: 1280px;
  width: 100%;
  height: 100%;
`

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 860px;
`

const FirstPageContent = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  justify-content: space-between;
`

const FirstPageTypo = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const FirstPageTypo1 = styled.div`
  color: var(--main-color);
  font-weight: bold;
  font-size: 100px;
  margin-bottom: 20px;
`
const FirstPageTypo2Section = styled.div`
  margin-bottom: 25px;
`

const FirstPageTypo2 = styled.div`
  font-weight: bold;
  font-size: 50px;
`
const FirstPageTypo3 = styled.div`
  color: var(--gray-color);
  font-size: 20px;
  margin-bottom: 5px;
`

const FirstPageCsForm = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CsForm = styled(Card)`
  padding: 30px 15px;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
`
const CsFormTitle = styled.div`
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.23);
  font-size: 20px;
  font-weight: bold;
`

const CsFormField = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CsFormTextField = styled(TextField)`
  margin-top: 30px;
`

const TextArea = styled(TextareaAutosize)`
  resize: none;

  padding: 16.5px 14px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border: 2px solid var(--main-color);
    outline: none;
  }

  &:hover:not(:focus) {
    border-color: #212021;
  }

  ::placeholder {
    color: gray;
  }
`

const PageContent = styled.div`
  width: 1200px;
  height: 100%;
`

const PageTitle = styled.div`
  padding-bottom: 10px;
  font-size: 50px;
  font-weight: bold;
`

const ContentCard = styled.div`
  padding: 24px 20px;
  width: 48%;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
`

const LogoSection = styled.div`
  width: 750px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LogoDiv = styled.div`
  background-color: white;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  width: 100px;
  height: 100px;
`

const CurriculumSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0;
  width: 100%;
  height: 60%;
`

const CurriculumDiv = styled.div`
  width: 30%;
`

const CurriculumTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding-bottom: 20px;
`

interface CurriculumTitleHighlightProps {
  titleHighlightColor?: string
}
const CurriculumTitleHighlight = styled.span<CurriculumTitleHighlightProps>`
  font-weight: bold;
  display: inline;

  box-shadow: ${(props) => `inset 0 -1.2rem 0 ${props.titleHighlightColor}` || 'none'};
`

const CurriculumDescription = styled.div`
  padding-bottom: 50px;
  height: 200px;
`

const CurriculumPriceDiscountSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const shimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
const CurriculumPriceDiscountBadge = styled.div`
  margin-right: 10px;
  display: inline-block;
  padding: 7px 15px;
  border-radius: 20px;
  background: linear-gradient(to right, rgb(175, 44, 255), rgb(255, 44, 150), rgb(255, 154, 45));
  background-size: 300% 300%;
  color: white;
  font-weight: bold;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${shimmer} 3s ease-in-out infinite;
`
const CurriculumOriginPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  color: var(--gray-color);
  font-size: 20px;
  font-weight: bold;
  text-decoration: line-through;
`
const CurriculumPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  color: red;
  font-size: 25px;
  font-weight: bold;
`
const CurriculumCsSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CurriculumCsForm = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CurriculumCsFormDescription = styled.div`
  font-size: 20px;
  padding-bottom: 20px;
`
const CurriculumCsFormFields = styled.div`
  display: flex;
  align-items: center;
`

const ReviewPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 800px;
`
const ReviewPageTitle = styled.div`
  padding-bottom: 50px;
  font-size: 50px;
  font-weight: bold;
`
const TempReviewSection = styled.div`
  padding-top: 30px;
  height: 290px;

  /* background-color: greenyellow; */
`
const TempReviewListItem = styled(Card)`
  padding: 15px;
  height: 200px;
  width: 350px;
  margin-right: 30px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ReviewSection = styled.div`
  margin-top: 20px;
  height: 200px;
`
const ReviewTitle = styled.div`
  height: 40px;

  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
`

const ReviewListItem = styled(Card)`
  padding: 15px;
  height: 160px;
  width: 300px;
  margin-right: 30px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ReviewListItemDescription = styled.div``
const ReviewListItemName = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: var(--gray-color);
`
