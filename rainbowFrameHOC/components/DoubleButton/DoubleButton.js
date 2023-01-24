import React from "react";
import PropTypes from "prop-types";

import "./DoubleButton.css";

export class DoubleButton extends React.Component {
  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        <input
          type="button"
          value={this.props.caption1}
          onClick={() => this.props.cbPressed(1)}
        />
        <span className="DoubleButtonText">{this.props.children}</span>
        <input
          type="button"
          value={this.props.caption2}
          onClick={() => this.props.cbPressed(2)}
        />
      </>
    );
  }
}
