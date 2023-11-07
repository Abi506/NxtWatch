import styled from 'styled-components'

export const VideoMainContainer = styled.div`
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  width: 100%;
`

export const VideoTitle = styled.p`
  background-color: ${props => (props.isDarkMode ? '#f9f9f9' : '#181818')};
`
