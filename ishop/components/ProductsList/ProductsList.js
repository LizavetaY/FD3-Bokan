const ProductsList = React.createClass({
  displayName: "ProductsList",

  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    headersData: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
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
    const tableHeaderCode = this.props.headersData.map((header, index) =>
      React.DOM.th({ key: index, className: "TableHeader" }, header)
    );

    return React.DOM.div(
      { className: "ProductsList" },
      React.DOM.h1({ className: "Header" }, this.props.shopName),
      React.DOM.table(
        { className: "Table" },
        React.DOM.thead(null, React.DOM.tr(null, tableHeaderCode)),
        React.createElement(ProductsItem, {
          productsData: this.props.productsData,
        })
      )
    );
  },
});
