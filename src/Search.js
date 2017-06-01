import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  getValidationState() {
    const length = this.state.term.length;
    if (length > 3) return 'success';
    else if (length > 0) return 'error';
  }

  handleSubmit(event) {
    this.props.handleTerm(this.state.term);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <FormControl
              type="search"
              value={this.state.term}
              placeholder="Search..."
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          {' '}
          <Button type="submit">Search</Button>
        </Form>
      </div>
    )
  }
}
export default Search;