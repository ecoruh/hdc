import React from 'react';
import ApiUtils from './ApiUtils';
import Auth from './Auth';
import Search from './Search';
import { Table } from 'react-bootstrap';

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

class TableInstance extends React.Component {
  render() {
    const listItems = this.props.items.map((item, index) =>
      <tr><td>{item.name}</td><td>{item.value}</td></tr>
    ); 
    return (
      <Table striped bordered condensed hover>
        {/*<thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>*/}
        <tbody>
          {listItems}
        </tbody>
      </Table>
    );
  }
}

class Protected extends React.Component {

  constructor() {
    super();
    this.state = { list: [], term: '' };
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
  }

  componentDidMount() {
    Record.getRecord(() => {
      this.setState({ list: Record.list })
    });
  }

  handleSearchTerm(searchTerm) {
    this.setState({ term: searchTerm });
  }

  render() {
    return (
      <div>
        <Search handleTerm={this.handleSearchTerm} />
        <p></p>
        <div>{this.state.term}</div>
        <div>{this.props.searchComponent ? this.props.searchComponent.props.search : ''}</div>
        <TableInstance items={this.state.list} />
      </div>);
  }
}

export default Protected;