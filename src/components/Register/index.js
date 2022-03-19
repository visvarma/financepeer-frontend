import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    gender: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeGender = event => {
    this.setState({gender: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, name, gender} = this.state

    const url = 'https://financepeer-vrv-backend.herokuapp.com/register'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password, name, gender}),
      headers: {
        'content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderNameField = () => {
    const {name} = this.state

    return (
      <>
        <label className="input-label" htmlFor="name">
          NAME
        </label>
        <input
          type="text"
          id="name"
          className="password-input-field"
          value={name}
          onChange={this.onChangeName}
          placeholder="Name"
        />
      </>
    )
  }

  renderGenderField = () => {
    const {gender} = this.state

    return (
      <>
        <label className="input-label" htmlFor="gender">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          className="password-input-field"
          value={gender}
          onChange={this.onChangeGender}
          placeholder="Gender"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/visvarma/image/upload/v1647694111/Financepeer_new_logo_o0wuc5.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/visvarma/image/upload/v1647694111/Financepeer_new_logo_o0wuc5.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderNameField()}</div>
          <div className="input-container">{this.renderGenderField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Register
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <Link to="/login">Login user</Link>
        </form>
      </div>
    )
  }
}

export default Login
