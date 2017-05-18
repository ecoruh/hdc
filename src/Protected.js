import React from 'react';
import ApiUtils from './ApiUtils';
import Auth from './Auth';

const Record = {
  list: [],
  getRecord(cb) {
    fetch('/api/book', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': '' + Auth.token
      }
    })
      .then(ApiUtils.checkStatus)
      .then(response => response.json()
      )
      .then(response => {
        this.list = response;
        cb();
      })
      .catch(e => {
        console.error(e);
        this.list = [];
        cb();
      });
  }
}

class Protected extends React.Component {

  constructor() {
    super();
    this.state = { list: [] };
  }

  componentDidMount() {
    Record.getRecord(() => {
      this.setState({ list: Record.list })
    });
  }

  render() {
    const listItems = this.state.list.map((item) =>
      <li>{item.name}</li>
    );
    return (
      <div>
        <h3>Book</h3>
        <ul>{listItems}</ul>
      </div>);
  }

}

// const Protected = () => <h3>Protected</h3>
export default Protected;