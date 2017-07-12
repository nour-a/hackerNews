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


function Search({ value, onChange, children }) {
    return (
        <form>
            {children} <input
                type="text"
                value={value}
                onChange={onChange}
            />
        </form>
    );
}
export default Search;


