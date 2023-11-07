import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import NxtWatchContext from '../../context/index'

import './index.css'

const VideoItem = props => {
  const {details} = props

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <div className="videos-container">
            <ul className="videos-list">
              {details.map(each => (
                <li key={each.id} className="each-video-list">
                  <div className="thumbnail-container">
                    <img
                      src={each.thumbnailUrl}
                      alt="video"
                      className="thumbnail-image"
                    />
                  </div>
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
                          isDarkMode ? 'video-title-dark' : 'video-title-light'
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
                          <li className="views-and-year">{each.viewCount}</li>
                          <li className="views-and-year">
                            {formatDistanceToNow(new Date(each.publishedAt))}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default VideoItem
