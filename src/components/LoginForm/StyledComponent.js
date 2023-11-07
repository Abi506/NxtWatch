import styled from 'styled-components'

export const LoginPageContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#231f20' : '#f1f5f9')};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const LoginFormSection = styled.form`
  @media all and (max-width: 576px) {
    width: 300px;
    padding: 15px;
    background-color: ${props => (props.darkMode ? '#000000' : 'white')};
    border-radius: 5px;
  }
  @media all and (min-width: 577px) {
    width: 400px;
    padding: 25px;
    background-color: ${props => (props.darkMode ? '#000000' : 'white')};
    border-radius: 5px;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const LogoImage = styled.img`
  @media all and (max-width: 576px) {
    width: 150px;
  }
  @media all and (min-width: 577px) {
    width: 180px;
    margin-bottom: 10px;
  }
`
export const InputContainer = styled.div`
  margin-top: 15px;

  @media all and (min-width: 577px) {
    margin-top: 25px;
  }
`
export const InputLabels = styled.label`
  color: ${props => (props.darkMode ? 'white' : '#616e7c')};

  @media all and (max-width: 576px) {
    margin-top: 15px;
    font-size: 15px;
  }
  @media all and (min-width: 577px) {
    font-size: 15px;
  }
`
export const InputElement = styled.input`
  display: block;
  padding: 10px;
  border-radius: 4px;
  color: #7e858e;
  background-color: ${props => (props.darkMode ? '#000000' : '')};
  margin-top: 10px;
  outline: none;
  border: 1px solid #7e858e;
  @media all and (max-width: 576px) {
    width: 250px;
  }
  @media all and (min-width: 577px) {
    width: 350px;
    padding: 10px;
    font-size: 16px;
  }
`
export const CheckBoxContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 10px;
  margin-top: 5px;
  @media all and (min-width: 577px) {
    padding: 10px;
    padding-left: 0px;
  }
`
export const CheckBoxInput = styled.input`
  width: 20px;
  @media all and (min-width: 577px) {
    width: 25px;
    height: 15px;
  }
`
export const ShowPassword = styled.label`
  color: ${props => (props.darkMode ? 'white' : 'black')};
  align-self: center;
  font-weight: 500;
  @media all and (min-width: 577px) {
    font-size: 15px;
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  @media all and (min-width: 577px) {
    width: 350px;
  }
`

export const LoginButton = styled.button`
  flex-grow: 1;
  color: white;
  padding: 10px;
  background-color: #3b82f6;
  border: 1px solid #3b82f6;
  border-radius: 7px;
  cursor: pointer;
  @media all and (min-width: 577px) {
    padding: 15px;
    font-size: 16px;
  }
`
export const ErrorMessage = styled.p`
  color: #ff0000;
  @media all and (min-width: 577px) {
    font-size: 17px;
  }
`
