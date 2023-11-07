import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'

import {
  AiOutlineClose,
  AiOutlineSearch,
  AiFillHome,
  AiFillFire,
} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'

import Header from '../Header'
import VideoItem from '../VideoItem'
import SearchResultNotFound from '../SearchNotFound/index'

import NxtWatchContext from '../../context/index'

import Fail from '../FailedStatus'

import './index.css'

import {
  BodyContainer,
  SideBarContainer,
  HomeContainer,
  ContactHeading,
  ContactDescription,
  ContentContainer,
  PremiumContainer,
} from './StyledComponent'

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

class Home extends Component {
  state = {
    videosList: [],
    searchInput: '',
    searchResultNotFound: false,

    DisplayPremium: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apistatus: apiStatus.in_progress})

    const jwtToken = Cookie.get('jwt_token')
    const {apistatus, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(video => ({
        name: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))

      this.setState({
        videosList: updatedData,
        apistatus: apiStatus.success,
        searchResultNotFound: false,
      })
      if (updatedData.length === 0) {
        this.setState({searchResultNotFound: true})
      }
    } else {
      this.setState({apistatus: apiStatus.fail})
    }
  }

  searchEvent = event => {
    this.setState({searchInput: event.target.value})
  }

  searchIconCliked = () => {
    this.getVideos()
  }

  closeIcon = () => {
    this.setState({DisplayPremium: false})
  }

  activeSection = id => {
    this.setState({activeState: id})
  }

  render() {
    const {
      searchInput,
      videosList,

      apistatus,
      DisplayPremium,
      searchResultNotFound,
    } = this.state

    return (
      <div>
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDarkMode, activeState, changeState} = value

            const activeSection = id => {
              changeState(id)
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
                <div
                  className={
                    isDarkMode
                      ? 'homePage-container-dark'
                      : 'homePage-container-light'
                  }
                  data-testid="home"
                >
                  {DisplayPremium === true && (
                    <div className="premium-container">
                      <div className="close-button-container">
                        <AiOutlineClose
                          className="close-button"
                          data-testid="close"
                          onClick={this.closeIcon}
                        />
                      </div>
                      <div>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="website-premium-logo"
                        />
                      </div>
                      <p className="premium-description">
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </p>
                      <div className="button-container">
                        <button type="button" className="premium-button">
                          GET IT NOW
                        </button>
                      </div>
                    </div>
                  )}

                  <div
                    className={
                      isDarkMode
                        ? 'search-container-light'
                        : 'search-container-dark'
                    }
                  >
                    <input
                      type="search"
                      onChange={this.searchEvent}
                      value={searchInput}
                      className={
                        isDarkMode ? 'search-box-dark' : 'search-box-light'
                      }
                      placeholder="search"
                    />

                    <span
                      data-testid="searchButton"
                      className={
                        isDarkMode ? 'span-search-dark' : 'span-search-light'
                      }
                    >
                      <AiOutlineSearch
                        className="search-icon"
                        onClick={this.searchIconCliked}
                      />
                    </span>
                  </div>

                  {apistatus === apiStatus.success &&
                    searchResultNotFound === false && (
                      <div>
                        <VideoItem details={videosList} />
                      </div>
                    )}
                  {searchResultNotFound === true && <SearchResultNotFound />}

                  {apistatus === apiStatus.fail && <Fail />}
                </div>

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

                  <HomeContainer isDarkMode={isDarkMode} data-testid="home">
                    <ContentContainer isDarkMode={isDarkMode}>
                      {DisplayPremium === true && (
                        <PremiumContainer>
                          <div className="close-button-container">
                            <AiOutlineClose
                              className="close-button"
                              data-testid="close"
                              onClick={this.closeIcon}
                            />
                          </div>
                          <div>
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                              alt="nxt watch logo"
                              className="website-premium-logo"
                            />
                          </div>
                          <p className="premium-description">
                            Buy Nxt Watch Premium prepaid plans with UPI
                          </p>
                          <div className="button-container">
                            <button type="button" className="premium-button">
                              GET IT NOW
                            </button>
                          </div>
                        </PremiumContainer>
                      )}

                      <div
                        className={
                          isDarkMode
                            ? 'search-container-light'
                            : 'search-container-dark'
                        }
                      >
                        <input
                          type="search"
                          onChange={this.searchEvent}
                          value={searchInput}
                          className={
                            isDarkMode ? 'search-box-dark' : 'search-box-light'
                          }
                          placeholder="search"
                        />
                        <span
                          data-testid="searchButton"
                          className={
                            isDarkMode
                              ? 'span-search-dark'
                              : 'span-search-light'
                          }
                        >
                          <AiOutlineSearch
                            className="search-icon"
                            onClick={this.searchIconCliked}
                          />
                        </span>
                      </div>
                      {apistatus === apiStatus.success &&
                        searchResultNotFound === false && (
                          <div>
                            <VideoItem details={videosList} />
                          </div>
                        )}
                      {searchResultNotFound === true && (
                        <SearchResultNotFound />
                      )}

                      {apistatus === apiStatus.fail && <Fail />}
                    </ContentContainer>
                  </HomeContainer>
                </BodyContainer>
              </>
            )
          }}
        </NxtWatchContext.Consumer>
      </div>
    )
  }
}

export default Home
