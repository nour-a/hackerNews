import React, { Component } from 'react';
import Search from './component/Search';
import Table from './component/Table';
import Button from './component/Button'
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';


const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//isSearched
function isSearched(searchTerm) {
  return function (item) {
    return !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

//updateSearchTopstoriesState
const updateSearchTopstoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ];

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.OnSearchChange = this.OnSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
  }
  //needsToSearchTopstories
  needsToSearchTopstories(searchTerm) {
    return !this.state.results[searchTerm];
  }
  //setSearchTopstories
  setSearchTopstories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopstoriesState(hits, page));
  }
  //fetchSearchTopstories
  fetchSearchTopstories(searchTerm, page) {
    //fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }
  //OnSearchChange
  OnSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }
  //onSearchSubmit
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopstories(searchTerm)) {
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }
  //onDismess
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  //componentDidMount
  componentDidMount() {
    //const { searchTerm } = this.state;
    this.setState({ searchKey: this.state.searchTerm });
    this.fetchSearchTopstories(this.state.searchTerm, DEFAULT_PAGE);
  }



  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={this.state.searchTerm}
            onChange={this.OnSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search:
          </Search>
        </div>
          <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        <div className="interactions">
          <Button
          onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}
          >
            More
          </Button>
        </div>
      </div >
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