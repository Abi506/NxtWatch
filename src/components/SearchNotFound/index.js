import './index.css'
import {Heading, Para} from './StyledComponent'
import NxtWatchContext from '../../context/index'

const SearchResultNotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkMode} = value

      return (
        <div className="no-result-container">
          <div className="no-result-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="no-result-image"
            />
          </div>
          <Heading isDarkMode={isDarkMode}>No Search results found</Heading>
          <Para isDarkMode={isDarkMode}>
            Try different key words or remove search filter{' '}
          </Para>
          <div className="no-result-button-container">
            <button type="button" className="no-result-button">
              Retry
            </button>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default SearchResultNotFound
