import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike} from 'react-icons/bi'
import {RiPlayListAddLine} from 'react-icons/ri'
import {AiFillHome, AiFillFire, AiFillLike, AiFillDislike} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

import {
  VideoMainContainer,
  VideoTitle,
  LikeDislikeSavedPlaylist,
  BodyContainer,
  SideBarContainer,
  ContactDescription,
  ContactHeading,
  ContentContainer,
} from './StyledComponent'

import Header from '../Header'
import NxtWatchContext from '../../context/index'
import Fail from '../FailedStatus'

import './index.css'

const apiStatus = {
  initialize: 'INITIALIZE',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
}
const sections = [
  {
    font: <AiFillHome />,
    text: 'Home',
    id: 'home',
    path: '/',
  },
  {
    font: <AiFillFire />,
    text: 'Trending',
    path: '/trending',
    id: 'trending',
  },
  {
    font: <SiYoutubegaming />,
    text: 'Gaming',
    path: '/gaming',
    id: 'gaming',
  },
  {
    font: <RiPlayListAddLine />,
    text: 'Saved videos',
    path: '/saved-videos',
    id: 'savedVideos',
  },
]

class VideoItemDetails extends Component {
  state = {
    apistatus: apiStatus.initialize,
    videoData: {},
    isLiked: false,
    isDisLiked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params

    this.setState({apistatus: apiStatus.in_progress})

    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const {apistatus} = this.state

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      console.log(updatedData, 'sdfkjb')

      this.setState({videoData: updatedData, apistatus: apiStatus.success})
    } else {
      this.setState({apistatus: apiStatus.fail})
    }
  }

  likeIcon = () => {
    console.log('clicked')
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }))
    this.setState({isDisLiked: false})
  }

  disLikeIcon = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
    }))
    this.setState({isLiked: false})
  }

  render() {
    return (
      <>
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDarkMode, activeState, changeState, savedVideos} = value
            const {
              apistatus,
              videoData,
              isLiked,
              isDisLiked,
              isSaved,
            } = this.state
            const {
              videoUrl,
              title,
              viewCount,
              publishedAt,
              profileImageUrl,
              name,
              subscriberCount,
              description,
            } = videoData
            const activeSection = id => {
              changeState(id)
            }

            const saveIcon = () => {
              console.log('buttonClicked')
              this.setState(prevState => ({isSaved: !prevState.isSaved}))
              const newData = {
                videoUrl,
                title,
                viewCount,
                publishedAt,
                profileImageUrl,
                name,
                subscriberCount,
                description,
              }
              savedVideos(newData)
            }

            return (
              <>
                {apistatus === apiStatus.in_progress && (
                  <div className="loader-container">
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="red"
                        height="50"
                        width="50"
                      />
                    </div>
                  </div>
                )}
                {apistatus === apiStatus.success && (
                  <VideoMainContainer isDarkMode={isDarkMode}>
                    <div className="video-container">
                      <ReactPlayer url={videoUrl} width="100%" controls />
                      <VideoTitle isDarkMode={isDarkMode}>{title}</VideoTitle>
                      <ul className="channel-views-and-published-year">
                        <li className="views-and-year">{viewCount}</li>
                        <li className="views-and-year">
                          {formatDistanceToNow(new Date(publishedAt))}
                        </li>
                      </ul>
                      <LikeDislikeSavedPlaylist isDarkMode={isDarkMode}>
                        <li onClick={this.likeIcon}>
                          <button type="button" className="span-elements">
                            {isLiked ? (
                              <AiFillLike className="icon" />
                            ) : (
                              <BiLike className="icon" />
                            )}
                          </button>
                        </li>
                        <li onClick={this.disLikeIcon}>
                          <button type="button" className="span-elements">
                            {isDisLiked ? (
                              <AiFillDislike className="icon" />
                            ) : (
                              <BiDislike className="icon" />
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className={`span-elements ${isSaved ? 'save' : ''}`}
                          >
                            <RiPlayListAddLine
                              onClick={saveIcon}
                              className={`icon ${isSaved ? 'save' : ''}`}
                            />
                            Save
                          </button>
                        </li>
                      </LikeDislikeSavedPlaylist>
                      <hr />
                    </div>
                    <div className="channel-container">
                      <div className="channel-logo-container">
                        <img
                          src={profileImageUrl}
                          alt="channel profile "
                          className="channel-profile"
                        />
                      </div>
                      <div>
                        <VideoTitle isDarkMode={isDarkMode}>{name}</VideoTitle>
                        <p className="subscriber">
                          {subscriberCount} Subscribers
                        </p>
                      </div>
                    </div>
                    <VideoTitle isDarkMode={isDarkMode}>
                      {description}
                    </VideoTitle>
                  </VideoMainContainer>
                )}

                {apistatus === apiStatus.success && (
                  <BodyContainer>
                    <SideBarContainer isDarkMode={isDarkMode}>
                      <div>
                        {sections.map(each => (
                          <Link to={each.path} className="nav-link">
                            <li
                              key={each.id}
                              className={`each-section ${
                                each.id === activeState ? 'activeTab' : ''
                              }`}
                              onClick={() => activeSection(each.id)}
                            >
                              <span
                                className={`font-element ${
                                  each.id === activeState ? 'active-font' : ''
                                }`}
                              >
                                {each.font}
                              </span>
                              <p className="section-text">{each.text}</p>
                            </li>
                          </Link>
                        ))}
                      </div>
                      <div className="contact-section">
                        <ContactHeading isDarkMode={isDarkMode}>
                          CONTACT US
                        </ContactHeading>
                        <ul className="social-pages">
                          <li>
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                              alt="facebook logo"
                              className="logos"
                            />
                          </li>
                          <li>
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                              alt="twitter logo"
                              className="logos"
                            />
                          </li>
                          <li>
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                              alt=" linked in logo"
                              className="logos"
                            />
                          </li>
                        </ul>
                        <ContactDescription>
                          Enjoy! Now to see your channels and recommendations!
                        </ContactDescription>
                      </div>
                    </SideBarContainer>
                    <ContentContainer isDarkMode={isDarkMode}>
                      <ReactPlayer
                        url={videoUrl}
                        width="1200px"
                        height="500px"
                        controls
                      />
                      <VideoTitle isDarkMode={isDarkMode}>{title}</VideoTitle>
                      <div className="like-container-and-views-container">
                        <ul className="channel-views-and-published-year">
                          <li className="views-and-year">{viewCount}</li>
                          <li className="views-and-year">
                            {formatDistanceToNow(new Date(publishedAt))}
                          </li>
                        </ul>
                        <LikeDislikeSavedPlaylist isDarkMode={isDarkMode}>
                          <li onClick={this.likeIcon}>
                            <button type="button" className="span-elements">
                              {isLiked ? (
                                <AiFillLike className="icon" />
                              ) : (
                                <BiLike className="icon" />
                              )}
                              Like
                            </button>
                          </li>
                          <li onClick={this.disLikeIcon}>
                            <button type="button" className="span-elements">
                              {isDisLiked ? (
                                <AiFillDislike className="icon" />
                              ) : (
                                <BiDislike className="icon" />
                              )}
                              Dislike
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className={`span-elements ${
                                isSaved ? 'save' : ''
                              }`}
                            >
                              <RiPlayListAddLine
                                onClick={saveIcon}
                                className={`icon ${isSaved ? 'save' : ''}`}
                              />
                              Save
                            </button>
                          </li>
                        </LikeDislikeSavedPlaylist>
                      </div>
                      <hr />
                      <div className="channel-container">
                        <div className="channel-logo-container">
                          <img
                            src={profileImageUrl}
                            alt="channel profile "
                            className="channel-profile"
                          />
                        </div>
                        <div>
                          <VideoTitle isDarkMode={isDarkMode}>
                            {name}
                          </VideoTitle>
                          <p className="subscriber">
                            {subscriberCount} Subscribers
                          </p>
                        </div>
                      </div>
                      <VideoTitle isDarkMode={isDarkMode}>
                        {description}
                      </VideoTitle>
                    </ContentContainer>
                  </BodyContainer>
                )}
                {apistatus === apiStatus.fail && <Fail />}
              </>
            )
          }}
        </NxtWatchContext.Consumer>
      </>
    )
  }
}
export default VideoItemDetails
