import React, { Component } from 'react';

/*class Button extends Component {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                type="button"
            >
                {this.props.children}
            </button>
        );
    }
}*/

function Button({onClick,children, }) {

    return (
        <button
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );

}

export default Button;