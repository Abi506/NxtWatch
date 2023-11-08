import {Component} from 'react'
import {AiFillFire, AiFillHome} from 'react-icons/ai'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'

import Header from '../Header'
import TrendingItem from '../TrendingItem'
import Fail from '../FailedStatus'
import NxtWatchContext from '../../context/index'
import './index.css'
import GameItem from '../GameItem'

import {
  VideoMainContainer,
  VideoTitle,
  BodyContainer,
  SideBarContainer,
  ContactDescription,
  ContactHeading,
  ContentContainer,
  TrendingHeader,
} from './StyledComponent'

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

const apiStatus = {
  initialize: 'INITIALIZE',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class Gaming extends Component {
  state = {videosList: [], apistatus: apiStatus.initialize}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apistatus: apiStatus.in_progress})

    const jwtToken = Cookie.get('jwt_token')
    const {apistatus, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(video => ({
        id: video.id,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      console.log(updatedData)
      this.setState({
        videosList: updatedData,
        apistatus: apiStatus.success,
      })
    } else {
      this.setState({apistatus: apiStatus.fail})
    }
  }

  render() {
    const {videosList, apistatus} = this.state
    return (
      <>
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
                {apistatus === apiStatus.success && (
                  <VideoMainContainer isDarkMode={isDarkMode}>
                    <TrendingHeader isDarkMode={isDarkMode}>
                      <SiYoutubegaming className="fire-icon" />
                      <h1>Gaming</h1>
                    </TrendingHeader>
                    <GameItem details={videosList} />
                  </VideoMainContainer>
                )}

                {apistatus === apiStatus.success && (
                  <BodyContainer isDarkMode={isDarkMode}>
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
                      <TrendingHeader isDarkMode={isDarkMode}>
                        <SiYoutubegaming className="fire-icon" />
                        <h1>Gaming</h1>
                      </TrendingHeader>
                      <GameItem details={videosList} />
                    </ContentContainer>
                  </BodyContainer>
                )}

                {apistatus === apiStatus.fail && <Fail />}
              </>
            )
          }}
        </NxtWatchContext.Consumer>
        )
      </>
    )
  }
}
export default Gaming
