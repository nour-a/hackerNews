import React, { Component } from 'react';

class Button extends Component {
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
}

export default Button;