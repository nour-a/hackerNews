import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <form>
                <input
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </form>
        );
    }
}

export default Search;