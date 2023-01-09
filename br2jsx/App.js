import React from "react";
import ReactDOM from "react-dom";

import { BR2JSX } from "./components/BR2JSX/BR2JSX";

const textData = "первый<br>второй<br/>третий<br />последний";

ReactDOM.render(<BR2JSX text={textData} />, document.getElementById("root"));
