const ProductItem = React.createClass({
  displayName: "ProductItem",

  propTypes: {
    productData: React.PropTypes.shape({
      productId: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.number.isRequired,
      photoUrl: React.PropTypes.string.isRequired,
      quantity: React.PropTypes.number.isRequired,
    }),
    selectedProductId: React.PropTypes.string,
    selectOnClick: React.PropTypes.func.isRequired,
    deleteOnClick: React.PropTypes.func.isRequired,
  },

  deleteProductOnClick(event) {
    event.stopPropagation();

    if (confirm("Do you really want to delete the product?")) {
      this.props.deleteOnClick(event.target.dataset.productid);
    }
  },

  getClass(id) {
    if (id == this.props.selectedProductId) {
      return "SelectedProduct";
    }

    return null;
  },

  render() {
    return React.DOM.tr(
      {
        className: this.getClass(this.props.productData.productId),
        "data-id": this.props.productData.productId,
        onClick: this.props.selectOnClick,
      },
      React.DOM.td({ className: "TableData" }, this.props.productData.name),
      React.DOM.td(
        { className: "TableData" },
        `$ ${this.props.productData.price}`
      ),
      React.DOM.td({ className: "TableData" }, this.props.productData.quantity),
      React.DOM.td(
        { className: "TableData" },
        React.DOM.img({
          src: this.props.productData.photoUrl,
          alt: `${this.props.productData.name} image`,
          className: "ProductImage",
        })
      ),
      React.DOM.td(
        { className: "TableData" },
        React.DOM.button(
          {
            "data-productid": this.props.productData.productId,
            onClick: this.deleteProductOnClick,
          },
          "Delete"
        )
      )
    );
  },
});
