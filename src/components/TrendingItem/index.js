import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import './index.css'

import {
  TrendingMainContainer,
  TrendingVideoTitle,
  VideoMainContainer,
  ListContainer,
  List,
  EachList,
  EachListUl,
} from './StyledComponent'

import NxtWatchContext from '../../context'

const TrendingItem = props => {
  const {details} = props
  const {
    id,
    name,
    profileImageUrl,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = details
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkMode, activeState, changeState} = value

        return (
          <TrendingMainContainer>
            <EachListUl isDarkMode={isDarkMode} className="trending-lists">
              {details.map(each => (
                <Link to={`/videos/${each.id}`} className="nav-link">
                  <List key={each.id} isDarkMode={isDarkMode}>
                    <EachList isDarkMode={isDarkMode} className="each-list">
                      <img
                        src={each.thumbnailUrl}
                        alt={name}
                        className="thumbnail-image-case2"
                      />
                      <ListContainer isDarkMode={isDarkMode}>
                        <div className="details-of-the-video-container">
                          <div className="channel-logo-container">
                            <img
                              src={each.profileImageUrl}
                              alt="channel profile "
                              className="channel-profile"
                            />
                          </div>

                          <div className="video-details-container">
                            <p
                              className={
                                isDarkMode
                                  ? 'video-title-dark'
                                  : 'video-title-light'
                              }
                            >
                              {each.title}
                            </p>
                            <div
                              className={
                                isDarkMode
                                  ? 'channel-name-and-other-details-container-light'
                                  : 'channel-name-and-other-details-container-light'
                              }
                            >
                              <p className="channel-name">{each.name}</p>
                              <ul className="channel-views-and-published-year">
                                <li className="views-and-year">
                                  {each.viewCount}
                                </li>
                                <li className="views-and-year">
                                  {formatDistanceToNow(
                                    new Date(each.publishedAt),
                                  )}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </ListContainer>
                    </EachList>
                  </List>
                </Link>
              ))}
            </EachListUl>
          </TrendingMainContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default TrendingItem
