import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'

import LoginForm from './components/LoginForm'
import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/index'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
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
    isDarkMode: false,

    activeState: sections[0].id,
    savedVideosList: [],
  }

  changeMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  changeActiveState = id => {
    this.setState({activeState: id})
  }

  savedVideos = data => {
    console.log(data, 'here')
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, data],
    }))
  }

  render() {
    const {isDarkMode, activeState, savedVideos, savedVideosList} = this.state
    console.log(savedVideosList, 'lishdfbkdsfbjkdfsbkjdfsbkjsdbjksdfbjkdsfbkjb')
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkMode,
          changeMode: this.changeMode,
          activeState,
          changeState: this.changeActiveState,
          savedVideos: this.savedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
