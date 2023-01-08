import React from "react";
import PropTypes from "prop-types";

import "./EditProductBlock.css";

export class EditProductBlock extends React.Component {
  static propTypes = {
    productData: PropTypes.shape({
      productId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photoUrl: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
    toggleEditButtonOnDirty: PropTypes.func.isRequired,
    editOnClick: PropTypes.func.isRequired,
    closeOnClick: PropTypes.func.isRequired,
  };

  state = {
    inputNameValue: this.props.productData.name,
    inputPriceValue: this.props.productData.price,
    inputURLValue: this.props.productData.photoUrl,
    inputQuantityValue: this.props.productData.quantity,
    inputNameErrorMessage: "",
    inputPriceErrorMessage: "",
    inputURLErrorMessage: "",
    inputQuantityErrorMessage: "",
  };

  validateFrom = (inputId) => {
    switch (inputId) {
      case "Name":
        if (
          !/\b[^\d\W]+\b/g.test(this.state.inputNameValue) ||
          !this.state.inputNameValue
        ) {
          this.setState({
            inputNameErrorMessage:
              "Please, fill the field. Value must be a string",
          });

          break;
        }

        this.setState({
          inputNameErrorMessage: "",
        });

        break;

      case "Price":
        if (this.state.inputPriceValue <= 0 || !this.state.inputPriceValue) {
          this.setState({
            inputPriceErrorMessage:
              "Please, fill the field. Value must be a rational number greater than 0",
          });

          break;
        }

        this.setState({
          inputPriceErrorMessage: "",
        });

        break;

      case "URL":
        if (
          !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
            this.state.inputURLValue
          ) ||
          !this.state.inputURLValue
        ) {
          this.setState({
            inputURLErrorMessage:
              "Please, fill the field. Value must be a valid URL",
          });

          break;
        }

        this.setState({
          inputURLErrorMessage: "",
        });

        break;

      case "Quantity":
        if (
          this.state.inputQuantityValue <= 0 ||
          !this.state.inputQuantityValue
        ) {
          this.setState({
            inputQuantityErrorMessage:
              "Please, fill the field. Value must be a positive integer",
          });

          break;
        }

        this.setState({
          inputQuantityErrorMessage: "",
        });

        break;
    }
  };

  handleInputOnChange = (event) => {
    this.setState(
      {
        [`input${event.target.id}Value`]: event.target.value.trim(),
      },
      () => {
        this.validateFrom(event.target.id);
        this.props.toggleEditButtonOnDirty(this.isFormDirty());
      }
    );
  };

  isFormDirty = () => {
    if (
      this.state.inputNameValue != this.props.productData.name ||
      this.state.inputPriceValue != this.props.productData.price ||
      this.state.inputURLValue != this.props.productData.photoUrl ||
      this.state.inputQuantityValue != this.props.productData.quantity ||
      !!this.state.inputNameErrorMessage ||
      !!this.state.inputPriceErrorMessage ||
      !!this.state.inputURLErrorMessage ||
      !!this.state.inputQuantityErrorMessage
    ) {
      return true;
    }

    return false;
  };

  isFormValidated = () => {
    if (
      !!this.state.inputNameValue &&
      !!this.state.inputPriceValue &&
      !!this.state.inputURLValue &&
      !!this.state.inputQuantityValue &&
      !this.state.inputNameErrorMessage &&
      !this.state.inputPriceErrorMessage &&
      !this.state.inputURLErrorMessage &&
      !this.state.inputQuantityErrorMessage &&
      (this.state.inputNameValue != this.props.productData.name ||
        this.state.inputPriceValue != this.props.productData.price ||
        this.state.inputURLValue != this.props.productData.photoUrl ||
        this.state.inputQuantityValue != this.props.productData.quantity)
    ) {
      return true;
    }

    return false;
  };

  resetForm = () => {
    this.setState({
      inputNameValue: "",
      inputPriceValue: "",
      inputURLValue: "",
      inputQuantityValue: "",
      inputNameErrorMessage: "",
      inputPriceErrorMessage: "",
      inputURLErrorMessage: "",
      inputQuantityErrorMessage: "",
    });
  };

  editProductOnClick = (event) => {
    event.preventDefault();

    this.props.editOnClick({
      productId: this.props.productData.productId,
      name: this.state.inputNameValue,
      price: +this.state.inputPriceValue,
      photoUrl: this.state.inputURLValue,
      quantity: +this.state.inputQuantityValue,
    });

    this.resetForm();
  };

  clearFormOnCancel = (event) => {
    event.preventDefault();

    if (
      this.isFormDirty() &&
      confirm("Do you really want to cancel the addition of the product?")
    ) {
      this.resetForm();
      this.props.closeOnClick();

      return;
    } else if (!this.isFormDirty()) {
      this.resetForm();
      this.props.closeOnClick();

      return;
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
      <div className="EditProductBlock">
        <h3>Editing of the product</h3>

        <p className="EditProductText">
          ID: {this.props.productData.productId}
        </p>

        <form className="Form">
          <label className="FormLabel">
            Name:
            <input
              id="Name"
              className="FormInput"
              type="text"
              defaultValue={this.state.inputNameValue}
              onChange={this.handleInputOnChange}
            />
            {!!this.state.inputNameErrorMessage && (
              <span className="FormError">
                {this.state.inputNameErrorMessage}
              </span>
            )}
          </label>

          <label className="FormLabel">
            Price:
            <input
              id="Price"
              className="FormInput"
              type="number"
              min="0"
              defaultValue={this.state.inputPriceValue}
              onChange={this.handleInputOnChange}
            />
            {!!this.state.inputPriceErrorMessage && (
              <span className="FormError">
                {this.state.inputPriceErrorMessage}
              </span>
            )}
          </label>

          <label className="FormLabel">
            URL:
            <input
              id="URL"
              className="FormInput"
              type="text"
              placeholder="http://xxx.com"
              defaultValue={this.state.inputURLValue}
              onChange={this.handleInputOnChange}
            />
            {!!this.state.inputURLErrorMessage && (
              <span className="FormError">
                {this.state.inputURLErrorMessage}
              </span>
            )}
          </label>

          <label className="FormLabel">
            Quantity:
            <input
              id="Quantity"
              className="FormInput"
              type="number"
              min="1"
              defaultValue={this.state.inputQuantityValue}
              onChange={this.handleInputOnChange}
            />
            {!!this.state.inputQuantityErrorMessage && (
              <span className="FormError">
                {this.state.inputQuantityErrorMessage}
              </span>
            )}
          </label>

          <div className="FormButtons">
            <button
              disabled={!this.isFormValidated()}
              type="submit"
              onClick={this.editProductOnClick}
            >
              Edit
            </button>
            <button onClick={this.clearFormOnCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
