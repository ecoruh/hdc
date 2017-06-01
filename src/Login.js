import React from 'react'
import {
  Redirect,
} from 'react-router-dom'
import {
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import ApiUtils from './ApiUtils';
import Auth from './Auth';

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
    Auth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    }, this.state.value);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { message } = this.props.location.state || { message: ''}
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
            <HelpBlock>{message}</HelpBlock>
          </FormGroup>
          <Button type="submit">Log in</Button>
        </Form>
      </div>
    )
  }
}
export default Login;