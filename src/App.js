import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/index'

import './App.css'

// Replace your code here

class App extends Component {
  state = {
    dummyData: '',
    isDarkMode: false,
  }

  changeMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  render() {
    const {isDarkMode} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkMode,
          changeMode: this.changeMode,
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
