import React from "react";
import ReactDOM from "react-dom";

import { DoubleButton } from "./components/DoubleButton/DoubleButton";

import { withRainbowFrame } from "./HOC/withRainbowFrame/withRainbowFrame";

const colorsData = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];

let FramedDoubleButton = withRainbowFrame(colorsData)(DoubleButton);

ReactDOM.render(
  <FramedDoubleButton
    caption1="однажды"
    caption2="пору"
    cbPressed={(num) => alert(num)}
  >
    в студёную зимнюю
  </FramedDoubleButton>,
  document.getElementById("root")
);
