import styled from 'styled-components'

export const TrendingMainContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
  padding: 10px;
  @media all and (min-width: 576px) {
    background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
    width: 100%;
    padding: 0px;
    margin: 0px;
  }
`
export const ListContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
  padding: 10px;
`

export const VideoMainContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
  padding: 10px;
  @media all and (min-width: 576px) {
    display: none;
  }
`
export const List = styled.li`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
`

export const TrendingVideoTitle = styled.p`
  color: ${props => (props.isDarkMode ? '#f9f9f9' : '#181818')};
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
export const EachList = styled.div`
  @media all and (min-width: 576px) {
    width: 900px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  }
  width: 100%;
`
export const EachListUl = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  list-style-type: none;
  padding: 0px;
`
