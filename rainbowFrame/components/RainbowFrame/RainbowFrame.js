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
    let prevCode = null;

    const contentCode = this.props.colors.map((color, index) => {
      let code = (
        <div
          key={index}
          className="RainbowFrame"
          style={{ border: `10px solid ${color}` }}
        >
          {index == 0 ? <h1>{this.props.children}</h1> : prevCode}
        </div>
      );

      prevCode = code;

      return code;
    });

    return <>{contentCode[contentCode.length - 1]}</>;
  }
}
