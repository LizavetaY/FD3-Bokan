import React from "react";

import "./withRainbowFrame.css";

export const withRainbowFrame = (colors) => (Comp) => (props) =>
  colors.reduce((code, color, index) => {
    return (
      <div
        key={index}
        className="RainbowFrame"
        style={{ border: `10px solid ${color}` }}
      >
        {code}
      </div>
    );
  }, <Comp {...props} />);
