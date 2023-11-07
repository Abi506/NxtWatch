import styled from 'styled-components'

import NxtWatchContext from '../../context/index'

export const Heading = styled.h1`
  color: ${props => (props.isDarkMode ? 'white' : '')};
`

export const Para = styled.p`
  color: ${props => (props.isDarkMode ? 'white' : '')};
`
