import styled from 'styled-components'

export const FailedContainer = styled.div`
  width: 100%;
  background-color: ${props => (props.isDarkMode ? '#181818' : '#f9f9f9')};
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`
export const Heading = styled.h1`
  color: ${props => (props.isDarkMode ? 'white' : '')};
`

export const Para = styled.p`
  color: ${props => (props.isDarkMode ? 'white' : '')};
`
