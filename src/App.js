import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import {
  AiOutlineClose,
  AiOutlineSearch,
  AiFillHome,
  AiFillFire,
} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'

import LoginForm from './components/LoginForm'
import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/index'

import './App.css'

// Replace your code here
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

class App extends Component {
  state = {
    dummyData: '',
    isDarkMode: false,
    activeState: sections[0].id,
  }

  changeMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  changeActiveState = id => {
    this.setState({activeState: id})
  }

  render() {
    const {isDarkMode, activeState, changeState} = this.state
    console.log(activeState, 'activeState')
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkMode,
          changeMode: this.changeMode,
          activeState,
          changeState: this.changeActiveState,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
