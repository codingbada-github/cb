import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isMobileState } from '@store'

export interface Menu {
  name: string
  top: number
}
export const HEADER_MENU: Array<Menu> = [
  {
    name: '코딩바다 소개',
    top: 860,
  },
  {
    name: '커리큘럼',
    top: 1720,
  },
  {
    name: '부모님들의 후기',
    top: 2580,
  },
]

interface HeaderProps {
  children?: React.ReactElement
}

export function Header({ children }: HeaderProps) {
  const isMobile: boolean = useRecoilValue(isMobileState)

  const handleScroll = (top: number) => {
    window.scrollTo({
      top: top,
      behavior: 'smooth',
    })
  }

  if (isMobile) {
    return (
      <>
        <MobileHeaderContainer>
          <MobileHeaderContent>
            <MobileMainLogo onClick={() => handleScroll(0)}>
              <MobileIcon src={'./assets/landing/codingbada-logo.png'} alt="codingbada-logo" />
              코딩바다
            </MobileMainLogo>
          </MobileHeaderContent>
        </MobileHeaderContainer>

        {children || <Outlet />}
      </>
    )
  } else {
    return (
      <>
        <HeaderContainer>
          <HeaderContent>
            <MainLogo onClick={() => handleScroll(0)}>
              <Icon src={'./assets/landing/codingbada-logo.png'} alt="codingbada-logo" />
              코딩바다
            </MainLogo>
            <MenuList>
              {HEADER_MENU.map((menu: Menu, index: number) => {
                return (
                  <MenuItem onClick={() => handleScroll(menu.top)} key={index}>
                    {menu.name}
                  </MenuItem>
                )
              })}
            </MenuList>
          </HeaderContent>
        </HeaderContainer>

        {children || <Outlet />}
      </>
    )
  }
}

const MobileHeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 30px;
  width: 100%;
  height: 60px;
  background-color: white;
  z-index: 999;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.23);
`
const MobileHeaderContent = styled.div``

const MobileMainLogo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 25px;
  color: var(--main-color);
  cursor: pointer;
`
const MobileIcon = styled.img`
  margin-right: 10px;
  width: 40px;

  cursor: pointer;
`

/*****/

const HeaderContainer = styled.div`
  min-width: 1280px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 5% 0 5%;
  width: 100%;
  height: 80px;
  background-color: white;
  z-index: 999;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.23);
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  width: 1200px;
`

const MainLogo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
  color: var(--main-color);
  cursor: pointer;
`

const MenuList = styled.div`
  display: flex;
  margin-left: 30px;
`

const MenuItem = styled.div`
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: bold;

  cursor: pointer;
  &:hover {
    background-color: #f0f4fa;
  }
`
const Icon = styled.img`
  margin-right: 10px;
  width: 60px;

  cursor: pointer;
`
