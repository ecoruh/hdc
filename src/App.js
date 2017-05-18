import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import './bootstrap.min.css';
import {
  Navbar,
  NavItem,
  Nav
} from 'react-bootstrap';
import Auth from './Auth';
import Login from './Login';
import Protected from './Protected';

const App = () => (
  <Router>
    <div className="container">
      <Navbar inverse>
        <Nav>
          <LoginItem />
          <LogoutItem />
        </Nav>
      </Navbar>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
      </ul>  
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
)

const Public = () => (
  <h2>Public</h2>
)

const LoginItem = withRouter(({ history }) => (
  !Auth.isAuthenticated ? (
    <NavItem eventKey={1} href="/protected">Login&nbsp;&nbsp;&nbsp;
    </NavItem>
  ) : (
      <div></div>
    )
))

const LogoutItem = withRouter(({ history }) => (
  Auth.isAuthenticated ? (
    <NavItem eventKey={1} onClick={() => {
      Auth.signout(() => history.push('/'))
    }}>Logout&nbsp;&nbsp;&nbsp;
      </NavItem>
  ) : (
      <div></div>
    )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location, message: Auth.message}
        }} />
      )
  )} />
)

export default App;