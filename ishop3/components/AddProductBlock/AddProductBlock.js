import React from "react";
import PropTypes from "prop-types";

import "./AddProductBlock.css";

export class AddProductBlock extends React.Component {
  static propTypes = {
    createdProductId: PropTypes.string.isRequired,
    addOnClick: PropTypes.func.isRequired,
    closeOnClick: PropTypes.func.isRequired,
  };

  state = {
    inputNameValue: "",
    inputPriceValue: "",
    inputURLValue: "",
    inputQuantityValue: "",
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
      () => this.validateFrom(event.target.id)
    );
  };

  isFormDirty = () => {
    if (
      !!this.state.inputNameValue ||
      !!this.state.inputPriceValue ||
      !!this.state.inputURLValue ||
      !!this.state.inputQuantityValue ||
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
      !this.state.inputQuantityErrorMessage
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

  addProductOnClick = (event) => {
    event.preventDefault();

    this.props.addOnClick({
      productId: this.props.createdProductId,
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
      <div className="AddProductBlock">
        <h3>Add new product</h3>

        <p className="AddProductText">ID: {this.props.createdProductId}</p>

        <form className="Form">
          <label className="FormLabel">
            Name:
            <input
              id="Name"
              className="FormInput"
              type="text"
              value={this.state.inputNameValue}
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
              value={this.state.inputPriceValue}
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
              value={this.state.inputURLValue}
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
              value={this.state.inputQuantityValue}
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
              onClick={this.addProductOnClick}
            >
              Add
            </button>
            <button onClick={this.clearFormOnCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
