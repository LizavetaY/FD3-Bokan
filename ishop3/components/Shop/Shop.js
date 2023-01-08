import React from "react";
import PropTypes from "prop-types";

import "./Shop.css";

import { ProductItem } from "../ProductItem/ProductItem";
import { ProductItemInfo } from "../ProductItemInfo/ProductItemInfo";
import { AddProductBlock } from "../AddProductBlock/AddProductBlock";
import { EditProductBlock } from "../EditProductBlock/EditProductBlock";

export class Shop extends React.Component {
  static propTypes = {
    shopName: PropTypes.string.isRequired,
    headersData: PropTypes.arrayOf(PropTypes.string).isRequired,
    productsData: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photoUrl: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    productsData: this.props.productsData.slice(),
    selectedProductId: "",
    isDisabledEditButton: false,
    isDisabledDeleteButton: false,
    isAddProductBlockOpen: false,
    isEditProductBlockOpen: false,
  };

  selectOnClick = (event) => {
    if (
      this.state.isEditProductBlockOpen &&
      event.target.nodeName != "BUTTON"
    ) {
      this.setState({
        isDisabledDeleteButton: false,
        isEditProductBlockOpen: false,
      });
    } else if (
      this.state.isEditProductBlockOpen &&
      event.target.nodeName == "BUTTON"
    ) {
      this.setState(
        {
          isEditProductBlockOpen: false,
        },
        () =>
          this.setState({
            isEditProductBlockOpen: true,
          })
      );
    }

    !this.state.isAddProductBlockOpen &&
      this.setState({
        selectedProductId: event.currentTarget.dataset.id,
      });
  };

  getCreatedProductId = () => {
    const lastProductIndex = this.state.productsData.length - 1;
    const lastProductId = this.state.productsData[lastProductIndex].productId;

    return `pr${+lastProductId.substr(2) + 1}`;
  };

  getProductData = () => {
    return this.state.productsData.find(
      (product) => product.productId == this.state.selectedProductId
    );
  };

  openAddProductBlock = () => {
    this.setState({
      selectedProductId: "",
      isDisabledEditButton: true,
      isDisabledDeleteButton: true,
      isAddProductBlockOpen: true,
    });
  };

  openEditProductBlock = () => {
    this.setState({
      isDisabledDeleteButton: true,
      isEditProductBlockOpen: true,
    });
  };

  transformProductsList = (deletedProductId) => {
    let productsListData = this.state.productsData.filter(
      (product) => product.productId != deletedProductId
    );

    this.setState({ productsData: productsListData });
  };

  addOnClick = (data) => {
    const productsDataArr = this.state.productsData;

    productsDataArr.push(data);

    this.setState({
      productsData: productsDataArr,
      isDisabledEditButton: false,
      isDisabledDeleteButton: false,
      isAddProductBlockOpen: false,
    });
  };

  editOnClick = (data) => {
    const productsDataArr = this.state.productsData.map((product) => {
      if (product.productId == data.productId) {
        return {
          ...product,
          ...data,
        };
      }

      return product;
    });

    this.setState({
      productsData: productsDataArr,
      isDisabledEditButton: false,
      isDisabledDeleteButton: false,
      isEditProductBlockOpen: false,
    });
  };

  toggleEditButtonOnDirty = (isDirty) => {
    this.setState({
      isDisabledEditButton: isDirty,
    });
  };

  deleteOnClick = (id) => {
    this.transformProductsList(id);

    if (this.state.selectedProductId == id) {
      this.setState({ selectedProductId: "" });
    }
  };

  closeOnClick = () => {
    this.setState({
      isDisabledEditButton: false,
      isDisabledDeleteButton: false,
      isAddProductBlockOpen: false,
      isEditProductBlockOpen: false,
    });
  };

  render() {
    const tableHeaderCode = this.props.headersData.map((header) => (
      <th key={header} className="TableHeader">
        {header}
      </th>
    ));

    const tableBodyCode = this.state.productsData.map((product) => (
      <ProductItem
        key={product.productId}
        productData={product}
        selectedProductId={this.state.selectedProductId}
        isDisabledEditButton={this.state.isDisabledEditButton}
        isDisabledDeleteButton={this.state.isDisabledDeleteButton}
        selectOnClick={this.selectOnClick}
        openEditBlockOnClick={this.openEditProductBlock}
        deleteOnClick={this.deleteOnClick}
      />
    ));

    return (
      <div className="Shop">
        <h1 className="Header">{this.props.shopName}</h1>

        <table className="Table">
          <thead>
            <tr>{tableHeaderCode}</tr>
          </thead>

          <tbody>{tableBodyCode}</tbody>
        </table>

        {!this.state.isAddProductBlockOpen &&
          !this.state.isEditProductBlockOpen && (
            <button onClick={this.openAddProductBlock}>Add new product</button>
          )}

        {!!this.state.selectedProductId &&
          !this.state.isAddProductBlockOpen &&
          !this.state.isEditProductBlockOpen && (
            <ProductItemInfo productData={this.getProductData()} />
          )}

        {this.state.isAddProductBlockOpen && (
          <AddProductBlock
            createdProductId={this.getCreatedProductId()}
            addOnClick={this.addOnClick}
            closeOnClick={this.closeOnClick}
          />
        )}

        {this.state.isEditProductBlockOpen && (
          <EditProductBlock
            productData={this.getProductData()}
            toggleEditButtonOnDirty={this.toggleEditButtonOnDirty}
            editOnClick={this.editOnClick}
            closeOnClick={this.closeOnClick}
          />
        )}
      </div>
    );
  }
}
