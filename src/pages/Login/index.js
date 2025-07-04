import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import Credits from './components/Credits'
import Logo from './components/Logo'
import Input from './components/Input'
import './Login.sass'
import Div100vh from 'react-div-100vh'
import Config from '../../config'
import login from '../../actions/login'
import register from '../../actions/register'
import { useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../actions/setAuthToken'
import { useDispatch } from 'react-redux'
import initIO from '../../actions/initIO'
import { useToasts } from 'react-toast-notifications'

const Login = () => {
  const dispatch = useDispatch()
  const { addToast } = useToasts()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keep, setKeep] = useState(true)
  const [loginErrors, setLoginErrors] = useState({})

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('')
  const [registerErrors, setRegisterErrors] = useState({})

  const setToken = useGlobal('token')[1]
  const setUser = useGlobal('user')[1]
  const [entryPath, setEntryPath] = useGlobal('entryPath')

  const history = useHistory()

  useEffect(() => {
    if (window.self !== window.top) {
      addToast(
        <a
          href='http://zaions.com'
          onClick={e => {
            e.preventDefault()
            window.top.location.href = Config.url
          }}
        >
          <b>
            Click here to remove the Envato frame or meetings will not work
            properly.
          </b>
        </a>,
        {
          appearance: 'warning',
          autoDismiss: false
        }
      )
    }
  }, [])

  const onLogin = async e => {
    e.preventDefault()
    try {
      const res = await login(email, password)
      if (keep) localStorage.setItem('token', res.data.token)
      if (keep)
        localStorage.setItem('user', JSON.stringify(jwtDecode(res.data.token)))
      setLoginErrors({})
      setAuthToken(res.data.token)
      setUser(jwtDecode(res.data.token))
      setToken(res.data.token)
      dispatch(initIO(res.data.token))
      history.replace(['/login', '/'].includes(entryPath) ? '/' : entryPath)
      await setEntryPath(null)
    } catch (e) {
      let errors = {}
      if (!e.response || typeof e.response.data !== 'object')
        errors.generic = 'Could not connect to server.'
      else errors = e.response.data
      setLoginErrors(errors)
    }
  }

  const onRegister = async e => {
    e.preventDefault()
    try {
      await register({
        username: registerUsername,
        email: registerEmail,
        firstName: registerFirstName,
        lastName: registerLastName,
        password: registerPassword,
        repeatPassword: registerRepeatPassword
      })
      const res = await login(registerEmail, registerPassword)
      setRegisterErrors({})
      if (keep) localStorage.setItem('token', res.data.token)
      setAuthToken(res.data.token)
      setUser(jwtDecode(res.data.token))
      setToken(res.data.token)
      dispatch(initIO(res.data.token))
    } catch (e) {
      let errors = {}
      if (!e.response || typeof e.response.data !== 'object')
        errors.generic = 'Could not connect to server.'
      else errors = e.response.data
      setRegisterErrors(errors)
    }
  }

  const loginInfo = Object.keys(loginErrors).map(key => (
    <div className='uk-text-center' key={key}>
      <span className='uk-text-danger'>{loginErrors[key]}</span>
    </div>
  ))

  const registerInfo = Object.keys(registerErrors).map(key => (
    <div className='uk-text-center' key={key}>
      <span className='uk-text-danger'>{registerErrors[key]}</span>
    </div>
  ))

  return (
    <Div100vh>
      <div className='login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-overflow-hidden uk-light'>
        <div className='uk-position-cover uk-overlay-primary' />
        <div className='login-scrollable uk-flex uk-flex-center uk-flex-middle uk-position-z-index'>
          <Credits />

          <div
            className='login-inner uk-width-medium uk-padding-small'
            data-uk-scrollspy='cls: uk-animation-fade'
          >
            <Logo />

            <div className='toggle-credits'>
              <form className='toggle-class' onSubmit={onLogin}>
                <fieldset className='uk-fieldset'>
                  {loginInfo}
                  <Input
                    icon='user'
                    placeholder='Username (or email)'
                    type='text'
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                    icon='lock'
                    placeholder='Password'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                  />
                  <div className='uk-margin-small'>
                    <label>
                      <input
                        className='uk-checkbox'
                        type='checkbox'
                        onChange={e => setKeep(e.target.checked)}
                        checked={keep}
                      />{' '}
                      Keep me logged in
                    </label>
                  </div>
                  <div className='uk-margin-bottom'>
                    <button
                      type='submit'
                      className='uk-button uk-button-primary uk-border-pill uk-width-1-1'
                    >
                      LOG IN
                    </button>
                  </div>
                </fieldset>
              </form>

              <form className='toggle-class' onSubmit={onRegister} hidden>
                {registerInfo}
                <Input
                  icon='user'
                  placeholder='Username'
                  type='text'
                  onChange={e => setRegisterUsername(e.target.value)}
                />
                <Input
                  icon='mail'
                  placeholder='Email'
                  type='email'
                  onChange={e => setRegisterEmail(e.target.value)}
                />
                <Input
                  icon='pencil'
                  placeholder='First Name'
                  type='text'
                  onChange={e => setRegisterFirstName(e.target.value)}
                />
                <Input
                  icon='pencil'
                  placeholder='Last Name'
                  type='text'
                  onChange={e => setRegisterLastName(e.target.value)}
                />
                <Input
                  icon='lock'
                  placeholder='Password'
                  type='password'
                  onChange={e => setRegisterPassword(e.target.value)}
                />
                <Input
                  icon='lock'
                  placeholder='Repeat Password'
                  type='password'
                  onChange={e => setRegisterRepeatPassword(e.target.value)}
                />
                <div className='uk-margin-bottom'>
                  <button
                    type='submit'
                    className='uk-button uk-button-primary uk-border-pill uk-width-1-1'
                  >
                    REGISTER
                  </button>
                </div>
              </form>

              <form className='toggle-password' hidden>
                <Input icon='mail' placeholder='Email' type='email' />
                <div className='uk-margin-bottom'>
                  <button
                    type='submit'
                    className='uk-button uk-button-primary uk-border-pill uk-width-1-1'
                  >
                    SEND CODE
                  </button>
                </div>
              </form>

              <div>
                <div className='uk-text-center'>
                  <a
                    href='http://zaions.com'
                    className='uk-link-reset uk-text-small toggle-class'
                    data-uk-toggle='target: .toggle-class ;animation: uk-animation-fade'
                  >
                    Need an account? Register now!
                  </a>
                  <a
                    href='http://zaions.com'
                    className='uk-link-reset uk-text-small toggle-class'
                    data-uk-toggle='target: .toggle-class ;animation: uk-animation-fade'
                    hidden
                  >
                    <span data-uk-icon='arrow-left' /> Back to Login
                  </a>
                </div>
              </div>
            </div>

            <form className='toggle-credits uk-text-center' hidden>
              <span>
                Everyone has a sweet side
                <br />
                Everything can taste like honey
                <br />
              </span>
              <br />
              Special thanks to all of the people who believed that Chat Zaions
              was possible and who made it possible.
              <br />
              <br />
              This Login / Register page uses by zzseba78
              <br />
              <br />
              The default background image is from
              <br />
              <br />A big thank you to all contributors to React, Redux,
              Socket.IO, Emoji Mart, Axios, SASS and Moment
            </form>

            <div>
              <div className='uk-margin-top uk-text-center'>
                <a
                  href='http://zaions.com'
                  className='uk-link-reset uk-text-small toggle-credits'
                  data-uk-toggle='target: .toggle-credits ;animation: uk-animation-fade'
                  hidden
                >
                  <span data-uk-icon='arrow-left' /> Close Credits
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div100vh>
  )
}

export default Login
