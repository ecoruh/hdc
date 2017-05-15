import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import './bootstrap.min.css';
import {
  Navbar,
  NavItem,
  Nav,
  ButtonToolbar,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
import ApiUtils from './ApiUtils';

const AuthExample = () => (
  <Router>
    <div className="container">
      <Navbar inverse>
        <Nav>
          <LoginItem />
          <LogoutItem />
        </Nav>
      </Navbar>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb, password) {
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
      })
    })
      .then(ApiUtils.checkStatus)
      .then(response => response.json()
      )
      .then(response => {
        // console.log(JSON.stringify(response));
        this.isAuthenticated = response.success;
        cb();
      })
      .catch(e => {
        console.error(e);
        this.isAuthenticated = false;
        cb();
      });
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const LoginItem = withRouter(({ history }) => (
  !fakeAuth.isAuthenticated ? (
    <NavItem eventKey={1} href="/protected">Login&nbsp;&nbsp;&nbsp;
    </NavItem>
  ) : (
      <div></div>
    )
))

const LogoutItem = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <NavItem eventKey={2} onClick={() => {
      fakeAuth.signout(() => history.push('/'))
    }}>Logout&nbsp;&nbsp;&nbsp;
      </NavItem>
  ) : (
      <div></div>
    )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 3) return 'success';
    else if (length > 0) return 'error';
  }

  login(event) {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    }, this.state.value);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <Form onSubmit={this.login}>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Enter login password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.value}
              placeholder="Enter password"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock />
          </FormGroup>
          <Button type="submit">Log in</Button>
        </Form>
      </div>
    )
  }
}

export default AuthExample