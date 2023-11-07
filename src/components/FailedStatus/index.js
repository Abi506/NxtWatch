import './index.css'

import {FailedContainer, Para, Heading} from './StyledComponent'
import NxtWatchContext from '../../context'

const Failed = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkMode} = value

      return (
        <FailedContainer isDarkMode={isDarkMode}>
          <div>
            <img
              src={
                isDarkMode
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failed "
              className="failed-image"
            />
          </div>
          <Heading isDarkMode={isDarkMode}>Oops! Something Went Wrong</Heading>
          <Para isDarkMode={isDarkMode}>
            We are having some trouble to complete your request Please try
            again.
          </Para>
          <div>
            <button type="button" className="button-styles">
              Retry
            </button>
          </div>
        </FailedContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default Failed
