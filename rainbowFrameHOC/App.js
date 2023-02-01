import React from "react";
import ReactDOM from "react-dom";

import { DoubleButton } from "./components/DoubleButton/DoubleButton";

import { withRainbowFrame } from "./HOC/withRainbowFrame/withRainbowFrame";
import { withTooltip } from "./HOC/withTooltip/withTooltip";

const colorsData = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];

let DoubleButtonWithTooltip = withTooltip(
  <div>
    <h3>DoubleButton with Tooltip</h3>
    <p>Some text ...</p>
  </div>,
  0
)(DoubleButton);

let FramedDoubleButton = withRainbowFrame(colorsData)(DoubleButton);
let FramedDoubleButtonWithTooltip = withTooltip(
  <div>
    <h3>FramedDoubleButton with Tooltip</h3>
    <p>Some text ...</p>
  </div>,
  1000
)(FramedDoubleButton);

ReactDOM.render(
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
      }}
    >
      <DoubleButtonWithTooltip
        caption1="однажды"
        caption2="пору"
        cbPressed={(num) => alert(num)}
      >
        в студёную зимнюю
      </DoubleButtonWithTooltip>
    </div>

    <FramedDoubleButtonWithTooltip
      caption1="однажды"
      caption2="пору"
      cbPressed={(num) => alert(num)}
    >
      в студёную зимнюю
    </FramedDoubleButtonWithTooltip>
  </>,
  document.getElementById("root")
);
