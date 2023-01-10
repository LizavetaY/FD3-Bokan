import React from "react";
import PropTypes from "prop-types";

import "./RainbowFrame.css";

export class RainbowFrame extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    colorsReversed: this.props.colors.slice().reverse(),
  };

  render() {
    return (
      <>
        {this.props.colors.reduce((code, color, index) => {
          return (
            <div
              key={index}
              className="RainbowFrame"
              style={{ border: `10px solid ${color}` }}
            >
              {code}
            </div>
          );
        }, <h1>{this.props.children}</h1>)}
      </>
    );
  }
}
