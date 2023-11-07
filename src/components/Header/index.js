import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

import {FaMoon} from 'react-icons/fa'

import {GiHamburgerMenu} from 'react-icons/gi'
import {IoExitOutline, IoSunnyOutline} from 'react-icons/io5'

import NxtWatchContext from '../../context/index'
import Failed from '../FailedStatus'

import './index.css'

const Header = props => {
  const logoutTriggered = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkMode, changeMode} = value
        const changModeIcon = () => {
          changeMode()
        }
        return (
          <nav
            className={
              isDarkMode ? 'nav-container-darkMode' : 'nav-container-lightMode'
            }
          >
            <ul className="nav-lists">
              <Link to="/" className="nav-link">
                <li>
                  <img
                    src={
                      isDarkMode
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    alt="nxt watch logo"
                    className="website-logo"
                  />
                </li>
              </Link>
              <div className="nav-items-container">
                <li onClick={changModeIcon}>
                  {isDarkMode ? (
                    <IoSunnyOutline className="dark-icons" />
                  ) : (
                    <FaMoon className="light-icons" />
                  )}
                </li>
                <li>
                  <GiHamburgerMenu
                    className={isDarkMode ? 'DarkModeIcons' : 'lightModeIcons'}
                  />
                </li>
                <li onClick={logoutTriggered}>
                  <IoExitOutline
                    className={
                      isDarkMode ? 'darkModeExitIcons' : 'lightModeLightIcons'
                    }
                  />
                </li>
              </div>
              <div className="nav-items-container-large">
                <li onClick={changModeIcon}>
                  {isDarkMode ? (
                    <IoSunnyOutline className="dark-icons-large" />
                  ) : (
                    <FaMoon className="light-icons-large" />
                  )}
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-image"
                  />
                </li>
                <li>
                  <button
                    type="button"
                    className="logout-button"
                    onClick={logoutTriggered}
                  >
                    Logout
                  </button>
                </li>
              </div>
            </ul>
          </nav>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default withRouter(Header)
