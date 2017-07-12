import React, { Component } from 'react';
import Search from './component/Search';
import Table from './component/Table';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

//isSearched
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
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.OnSearchChange = this.OnSearchChange.bind(this);
  }
  //setSearchTopstories
  setSearchTopstories(result) {
    this.setState({ result });
  }
  //fetchSearchTopstories
  fetchSearchTopstories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }
  //componentDidMount
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }
  //onDismess
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: Object.assign({}, this.state.result, { hits: updatedHits })
    });
  }
  //OnSearchChange
  OnSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {

    if (!this.state.result) { return null; }
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
          list={this.state.result.hits}
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