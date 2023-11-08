import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import NxtWatchContext from '../../context'
import {
  GameContainer,
  EachListUl,
  EachList,
  VideoTitle,
  ContactDescription,
} from './StyledComponent'

import './index.css'

const GameItem = props => {
  const {details} = props

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkMode} = value

        return (
          <GameContainer>
            <EachListUl isDarkMode={isDarkMode}>
              {details.map(each => (
                <Link
                  to={`/videos/${each.id}`}
                  className="nav-link"
                  key={each.id}
                >
                  <EachList
                    isDarkMode={isDarkMode}
                    className="each-list"
                    key={each.id}
                  >
                    <img
                      src={each.thumbnailUrl}
                      alt="game"
                      className="thumbnail-image-case3"
                    />
                    <div>
                      <VideoTitle isDarkMode={isDarkMode}>
                        {each.title}
                      </VideoTitle>
                      <ContactDescription>{each.viewCount}</ContactDescription>
                      <ContactDescription>Worldwide</ContactDescription>
                    </div>
                  </EachList>
                </Link>
              ))}
            </EachListUl>
          </GameContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default GameItem
