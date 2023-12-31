import styled from 'styled-components'

export const TrendingMainContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
  padding: 10px;
  display: block;
  @media all and (min-width: 576px) {
    display: none;
  }
`
export const VideoMainContainer = styled.div`
  display: block;
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
  padding: 10px;
  @media all and (min-width: 576px) {
    display: none;
  }
`

export const VideoTitle = styled.p`
  color: ${props => (props.isDarkMode ? '#f9f9f9' : '#181818')};
`
export const LikeDislikeSavedPlaylist = styled.ul`
  display: flex;
  flex-direction: row;
  width: 150px;
  justify-content: space-between;
  list-style-type: none;
  font-size: 20px;
  padding: 0px;
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
export const ContactDescription = styled.p`
  color: ${props => (props.isDarkMode ? ' #94a3b8' : '#94a3b8')};
  font-weight: 500;
`
export const ContactHeading = styled.h1`
  color: ${props => (props.isDarkMode ? ' #94a3b8' : '#94a3b8')};
  font-size: 18px;
`
export const ContentContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#212121' : '#f9f9f9')};
  width: 100%;
  overflow: auto;
  padding-bottom: 150px;
`
