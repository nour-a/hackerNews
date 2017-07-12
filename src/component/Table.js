import React, { Component } from 'react';
import Button from './Button'

//isSearch
function isSearch(searchTerm) {
    return function (item) {
        return !searchTerm ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}
/*class Table extends Component {
    render() {
        return (
            <div>
                {this.props.list.filter(isSearch(this.props.pattern)).map(item =>
                    <div key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        <span>
                            <Button onClick={() => this.props.onDismiss(item.objectID)}>
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )}
            </div>

        );
    }
}*/

function Table({ list, pattern, onDismiss }) {
    return (
        <div className="table">
            {list.filter(isSearch(pattern)).map(item =>
                <div key={item.objectID} className="table-row">
                    <span style={{ width: '40%' }}>
                        <a href={item.url}>Title :{item.title}</a>
                    </span>
                    <span style={{ width: '30%' }}>
                        Author :{item.author}
                    </span>
                    <span style={{ width: '10%' }}>
                        Comments :{item.num_comments}
                    </span>
                    <span style={{ width: '10%' }}>
                        Points :{item.points}
                    </span>
                    <span style={{ width: '10%' }}>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                        >
                            Dismiss
                        </Button>
                    </span>
                </div>
            )}
        </div>

    );

}

export default Table;