import React from 'react';

/*class Search extends Component {
    render() {
        return (
            <form>
                {this.props.children}<input
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </form>
        );
    }
}*/


function Search({ value, onChange, onSubmit, children }) {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
            <button type='submit'>
                {children}
            </button>
        </form>
    );
}
export default Search;


