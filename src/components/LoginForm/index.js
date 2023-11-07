import {Component} from 'react'

import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

import NxtWatchContext from '../../context/index'

import {
  LoginPageContainer,
  LoginFormSection,
  LogoContainer,
  LogoImage,
  InputContainer,
  InputLabels,
  InputElement,
  CheckBoxContainer,
  CheckBoxInput,
  ShowPassword,
  ButtonContainer,
  LoginButton,
  ErrorMessage,
} from './StyledComponent'

import './index.css'

class LoginForm extends Component {
  state = {
    isLoginFailed: false,
    username: '',
    password: '',
    errorMessage: '',
    showPassword: false,
  }

  usernameEvent = event => {
    this.setState({username: event.target.value})
  }

  passwordEvent = event => {
    this.setState({password: event.target.value})
  }

  displayPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  submissionFailed = error => {
    this.setState({errorMessage: error, isLoginFailed: true})
  }

  submissionSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    this.setState({isLoginFailed: false})
    history.replace('/')
  }

  submitEvent = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.submissionSuccess(data.jwt_token)
    } else {
      this.submissionFailed(data.error_msg)
    }
  }

  render() {
    const {
      isLoginFailed,
      username,
      password,
      errorMessage,
      showPassword,
    } = this.state
    const token = Cookie.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkMode} = value

          return (
            <LoginPageContainer darkMode={isDarkMode}>
              <LoginFormSection
                darkMode={isDarkMode}
                onSubmit={this.submitEvent}
              >
                <LogoContainer>
                  {isDarkMode === false && (
                    <LogoImage
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="logo"
                    />
                  )}
                  {isDarkMode === true && (
                    <LogoImage
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                      alt="logo"
                    />
                  )}
                </LogoContainer>
                <InputContainer>
                  <InputLabels htmlFor="username" darkMode={isDarkMode}>
                    USERNAME
                  </InputLabels>
                  <InputElement
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={this.usernameEvent}
                    value={username}
                    darkMode={isDarkMode}
                  />
                </InputContainer>
                <InputContainer>
                  <InputLabels htmlFor="password" darkMode={isDarkMode}>
                    PASSWORD
                  </InputLabels>
                  <InputElement
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={this.passwordEvent}
                    value={password}
                    darkMode={isDarkMode}
                  />
                </InputContainer>
                <CheckBoxContainer>
                  <CheckBoxInput
                    type="checkbox"
                    id="showPassword"
                    onClick={this.displayPassword}
                  />
                  <ShowPassword darkMode={isDarkMode} htmlFor="showPassword">
                    Show Password
                  </ShowPassword>
                </CheckBoxContainer>
                <ButtonContainer>
                  <LoginButton type="submit">Login</LoginButton>
                </ButtonContainer>
                {isLoginFailed && <ErrorMessage>* {errorMessage}</ErrorMessage>}
              </LoginFormSection>
            </LoginPageContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default LoginForm
