import styled from 'styled-components'

export const VideoMainContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  color: ${props => (props.isDarkMode ? '#f9f9f9' : '#181818')};
  width: 100%;

  padding: 10px;
  @media all and (min-width: 576px) {
    display: none;
  }
`

export const VideoTitle = styled.p`
  color: ${props => (props.isDarkMode ? '#f9f9f9' : '#181818')};
`

export const BodyContainer = styled.div`
  @media all and (min-width: 576px) {
    display: flex;

    flex-direction: row;
    height: 100vh;
  }
  @media all and (max-width: 576px) {
    display: none;
  }
`
export const SideBarContainer = styled.ul`
  background-color: ${props => (props.isDarkMode ? '#212121' : '#f9f9f9')};
  width: 250px;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style-type: none;

  padding: 0px;
`

export const HomeContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
`
export const ContactHeading = styled.h1`
  color: ${props => (props.isDarkMode ? ' #94a3b8' : '#94a3b8')};
  font-size: 18px;
`
export const ContactDescription = styled.p`
  color: ${props => (props.isDarkMode ? ' #94a3b8' : '#94a3b8')};
  font-weight: 500;
`
export const ContentContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
  overflow: auto;
`
export const TrendingHeader = styled.div`
  background-color: ${props => (props.isDarkMode ? '#212121' : '#ebebeb')};
  color: ${props => (props.isDarkMode ? ' #94a3b8' : '#212121')};
  padding-left: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
