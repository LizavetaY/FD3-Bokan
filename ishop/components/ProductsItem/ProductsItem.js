const ProductsItem = React.createClass({
  displayName: "ProductsItem",

  propTypes: {
    productsData: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        productId: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        photoUrl: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
      })
    ),
  },

  render: function () {
    const tableBodyCode = this.props.productsData.map((product) =>
      React.DOM.tr(
        { key: product.productId },
        React.DOM.td({ className: "TableData" }, product.name),
        React.DOM.td({ className: "TableData" }, `$ ${product.price}`),
        React.DOM.td({ className: "TableData" }, product.quantity),
        React.DOM.td(
          { className: "TableData" },
          React.DOM.img({
            src: product.photoUrl,
            alt: `${product.name} image`,
            className: "ProductImage",
          })
        )
      )
    );

    return React.DOM.tbody(null, tableBodyCode);
  },
});
