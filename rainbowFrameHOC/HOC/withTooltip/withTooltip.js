import React from "react";

import "./withTooltip.css";

let timerId = 0;

export const withTooltip = (JSXcode, time) => (Comp) => (props) => {
  const [isShownTooltip, setIsShownTooltip] = React.useState(false);

  const showTooltip = () => {
    if (!isShownTooltip) {
      timerId = setTimeout(() => {
        setIsShownTooltip(true);
      }, time);
    }
  };

  const hideTooltip = () => {
    clearTimeout(timerId);

    if (isShownTooltip) {
      setIsShownTooltip(false);
    }
  };

  return (
    <div
      className="TooltipContainer"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={hideTooltip}
    >
      <Comp {...props} />

      <div className={`TooltipText ${isShownTooltip ? "show" : "hide"}`}>
        {JSXcode}
      </div>
    </div>
  );
};
