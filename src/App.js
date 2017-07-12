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

function isSearched(searchTerm) {
  return function (item) {
    return !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.OnSearchChange = this.OnSearchChange.bind(this);
  }
  //onDismess
  onDismiss(id) {
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
    //const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={this.state.searchTerm}
            onChange={this.OnSearchChange} >
            Search:
          </Search>
          </div>
          <Table
            list={this.state.list}
            pattern={this.state.searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
        );
  }

}

/*class Search extends Component {
          render() {
        const {value, onChange } = this.props;
    return (
      <form>
          <input
            type="text"
            value={value}
            onChange={onChange}
          />
        </form>
        );
  }
}


class Table extends Component {
          render() {
        const {list, pattern, onDismiss } = this.props;
    return (
      <div>
          {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={() => onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
              </button>
              </span>
            </div>
          )}
        </div>
        );
  }
}*/

  export default App;