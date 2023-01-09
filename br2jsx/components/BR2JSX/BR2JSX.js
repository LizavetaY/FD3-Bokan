import React from "react";
import PropTypes from "prop-types";

import "./BR2JSX.css";

export class BR2JSX extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  state = {
    textAtt: this.props.text.split(/< ?br ?\/? ?>/gm),
  };

  render() {
    let contentCode = [];

    this.state.textAtt.map((textPiece, index) => {
      if (index != 0) contentCode.push(<br key={index} />);

      contentCode.push(textPiece);
    });

    return (
      <div className="Container">
        <div className="Br2jsx">{contentCode}</div>
      </div>
    );
  }
}
