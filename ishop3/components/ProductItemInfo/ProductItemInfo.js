import React from "react";
import PropTypes from "prop-types";

import "./ProductItemInfo.css";

export class ProductItemInfo extends React.Component {
  static propTypes = {
    productData: PropTypes.shape({
      productId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photoUrl: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  };

  render() {
    return (
      <div className="ProductInfo">
        <h3>{this.props.productData.name}</h3>

        <p className="ProductInfoText">Name: {this.props.productData.name}</p>
        <p className="ProductInfoText">
          Price:
          <span className="ProductInfoPrice">
            {` $ ${this.props.productData.price}`}
          </span>
        </p>
      </div>
    );
  }
}
