import styled from '@emotion/styled'
import { Card, TextField, Checkbox } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Face2Icon from '@mui/icons-material/Face2'
import { useToastClear } from '@hooks'

import { isErrorToastOpenState, errorToastMessageState, isMobileState, accountTokenState } from '@store'
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from 'recoil'

import { DebouncedButton } from '@components'
import { useState } from 'react'
import { LocalStorageKey, RequestApi } from '@api'
import { useNavigate } from 'react-router-dom'

export function ParentLoginPage() {
  const isMobile: boolean = useRecoilValue(isMobileState)
  useToastClear()
  const navigate = useNavigate()
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setAccountToken: SetterOrUpdater<string | null> = useSetRecoilState(accountTokenState)

  const [id, setId]: [string, Function] = useState('')
  const [password, setPassword]: [string, Function] = useState('')
  const [isLoginSave, setIsLoginSave]: [boolean, Function] = useState(true)

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleIsLoginSaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoginSave(true)
  }

  const handleLoginButtonClick = () => {
    if (id === '') {
      setIsErrorToastOpen(true)
      setErrorToastMessage('아이디를 입력해 주세요.')
      return
    }

    if (password === '') {
      setIsErrorToastOpen(true)
      setErrorToastMessage('비밀번호를 입력해 주세요.')
      return
    }

    ;(async () => {
      try {
        const response = await RequestApi.parent.postParentLogin({
          phone_number: id,
          password,
        })

        setId('')
        setPassword('')

        localStorage.setItem(LocalStorageKey.ACCOUNT_TOKEN, response.account_token)
        setAccountToken(response.account_token)

        navigate('/')
      } catch (error: any) {
        setIsErrorToastOpen(true)
        setErrorToastMessage('아이디 혹은 비밀번호를 확인해 주세요!')
      }
    })()
  }

  if (isMobile) {
    return (
      <MobileContainer>
        <MainLogo>코딩바다</MainLogo>

        <Title>
          <Face2Icon style={{ fontSize: '30px', paddingRight: '7px' }} />
          학부모 로그인
        </Title>

        <Form>
          <TextField value={id} onChange={handleIdChange} style={{ width: '100%', height: '50px' }} label="아이디" variant="outlined" />
          <TextField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: '100%', height: '50px' }}
            label="비밀번호"
            variant="outlined"
          />
        </Form>

        <ActionForm>
          <FormGroup style={{ width: '160px' }}>
            <FormControlLabel
              control={
                <Checkbox defaultChecked value={isLoginSave} onChange={handleIsLoginSaveChange} sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
              }
              label="로그인 상태 유지"
            />
          </FormGroup>
        </ActionForm>

        <DebouncedButton
          onClick={() => handleLoginButtonClick()}
          sx={{ width: '100%', height: '55px', fontSize: '20px' }}
          variant="contained"
          text={'로그인'}
        />

        <Copyright>Copyright © CodingBada All Rights Reserved.</Copyright>
      </MobileContainer>
    )
  }

  return (
    <Container>
      <CardContainer>
        <MainLogo>코딩바다</MainLogo>

        <Title>
          <Face2Icon style={{ fontSize: '30px', paddingRight: '7px' }} />
          학부모 로그인
        </Title>

        <Form>
          <TextField value={id} onChange={handleIdChange} style={{ width: '100%', height: '50px' }} label="아이디" variant="outlined" />
          <TextField value={password} onChange={handlePasswordChange} style={{ width: '100%', height: '50px' }} label="비밀번호" variant="outlined" />
        </Form>

        <ActionForm>
          <FormGroup style={{ width: '160px' }}>
            <FormControlLabel
              control={
                <Checkbox defaultChecked value={isLoginSave} onChange={handleIsLoginSaveChange} sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
              }
              label="로그인 상태 유지"
            />
          </FormGroup>
        </ActionForm>

        <DebouncedButton
          onClick={() => handleLoginButtonClick()}
          sx={{ width: '100%', height: '55px', fontSize: '20px' }}
          variant="contained"
          text={'로그인'}
        />

        <Copyright>Copyright © CodingBada All Rights Reserved.</Copyright>
      </CardContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
`

const CardContainer = styled(Card)`
  padding: 60px 55px 0;
  width: 448px;
  height: 548px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MainLogo = styled.div`
  font-weight: bold;
  font-size: 20px;

  display: flex;
  align-items: center;
`

const Title = styled.div`
  width: 100%;
  height: 50px;
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Form = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const ActionForm = styled.div`
  width: 100%;
  margin: 10px 0 30px;
`

const Copyright = styled.div`
  color: #868e96;
  padding-top: 50px;
  font-size: 12px;
`

const MobileContainer = styled.div`
  padding: 100px 30px 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`
