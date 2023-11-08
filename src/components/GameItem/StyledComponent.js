import styled from 'styled-components'

export const GameContainer = styled.div`
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
export const EachListUl = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  list-style-type: none;
  padding: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const EachList = styled.div`
  @media all and (min-width: 576px) {
    width: 250px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  }
  width: 100%;
`

export const VideoTitle = styled.h1`
  color: ${props => (props.isDarkMode ? '#f9f9f9' : '#181818')};
  font-size: 20px;
  margin: 0px;
  text-align: left;
`
export const ContactDescription = styled.p`
  color: ${props => (props.isDarkMode ? ' #94a3b8' : '#94a3b8')};
  font-weight: 500;
  text-align: left;
`
