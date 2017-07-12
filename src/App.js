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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.OnSearchChange = this.OnSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);


  }
  //setSearchTopstories
  setSearchTopstories(result) {
    const { hits, page } = result;
    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      result: { hits: updatedHits, page }
    });
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
    this.fetchSearchTopstories(this.state.searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }
  //onDismess
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: Object.assign({}, this.state.result, { hits: updatedHits })
    });
  }

  //componentDidMount
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }



  render() {
    const page = (this.state.result && this.state.result.page) || 0;
    if (!this.state.result) { return null; }
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
        {this.state.result &&
          <Table
            list={this.state.result.hits}
            //pattern={this.state.searchTerm}
            onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopstories(this.state.searchTerm, page + 1)}
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