import React, { Component } from 'react';
import Search from './component/Search';
import Table from './component/Table';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Redux1',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 21,
    points: 51,
    objectID: 2,
  }
];



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    }
    this.onDismess = this.onDismess.bind(this);
    this.OnSearchChange = this.OnSearchChange.bind(this);
  }
  //onDismess
  onDismess(id) {
    function isNotId(item) {
      return item.objectID !== id;
    }
    const updatList = this.state.list.filter(isNotId);
    this.setState({ list: updatList });
  }
  //OnSearchChange
  OnSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    return (
      <div className='App'>
        <Search
          value={this.state.searchTerm}
          onChange={this.OnSearchChange} />
        <Table
          list={this.state.list}
          pattern={this.state.searchTerm}
          onDismess = {this.onDismess}
          />
      </div>
    )
  }

}

export default App;