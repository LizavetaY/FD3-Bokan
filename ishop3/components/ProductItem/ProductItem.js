import React from "react";
import PropTypes from "prop-types";

import "./ProductItem.css";

export class ProductItem extends React.Component {
  static propTypes = {
    productData: PropTypes.shape({
      productId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photoUrl: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
    selectedProductId: PropTypes.string,
    isDisabledEditButton: PropTypes.bool,
    isDisabledDeleteButton: PropTypes.bool,
    selectOnClick: PropTypes.func.isRequired,
    toggleEditBlockOnClick: PropTypes.func.isRequired,
    deleteOnClick: PropTypes.func.isRequired,
  };

  deleteProductOnClick = (event) => {
    event.stopPropagation();

    if (confirm("Do you really want to delete the product?")) {
      this.props.deleteOnClick(event.target.dataset.productid);
    }
  };

  setClassSelected = (id) => {
    if (id == this.props.selectedProductId) {
      return "SelectedProduct";
    }

    return null;
  };

  render() {
    return (
      <tr
        className={this.setClassSelected(this.props.productData.productId)}
        data-id={this.props.productData.productId}
        onClick={this.props.selectOnClick}
      >
        <td className="TableData">{this.props.productData.name}</td>
        <td className="TableData">{`$ ${this.props.productData.price}`}</td>
        <td className="TableData">{this.props.productData.quantity}</td>
        <td className="TableData">
          <img
            className="ProductImage"
            src={this.props.productData.photoUrl}
            alt={`${this.props.productData.name} image`}
          />
        </td>
        <td className="TableData">
          <button
            data-productid={this.props.productData.productId}
            disabled={this.props.isDisabledEditButton}
            onClick={() => this.props.toggleEditBlockOnClick(true)}
          >
            Edit
          </button>

          <button
            data-productid={this.props.productData.productId}
            disabled={this.props.isDisabledDeleteButton}
            onClick={this.deleteProductOnClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
