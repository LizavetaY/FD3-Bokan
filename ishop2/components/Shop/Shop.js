const Shop = React.createClass({
  displayName: "Shop",

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

  getInitialState() {
    return {
      productsData: this.props.productsData.slice(),
      selectedProductId: "",
    };
  },

  selectOnClick(event) {
    this.setState({ selectedProductId: event.currentTarget.dataset.id });
  },

  transformProductsList(deletedProductId) {
    let productsListData = this.state.productsData.filter(
      (product) => product.productId != deletedProductId
    );

    this.setState({ productsData: productsListData });
  },

  deleteOnClick(id) {
    this.transformProductsList(id);
  },

  render() {
    const tableHeaderCode = this.props.headersData.map((header) =>
      React.DOM.th({ key: header, className: "TableHeader" }, header)
    );

    const tableBodyCode = this.state.productsData.map((product) =>
      React.createElement(ProductItem, {
        key: product.productId,
        productData: product,
        selectedProductId: this.state.selectedProductId,
        selectOnClick: this.selectOnClick,
        deleteOnClick: this.deleteOnClick,
      })
    );

    return React.DOM.div(
      { className: "Shop" },
      React.DOM.h1({ className: "Header" }, this.props.shopName),
      React.DOM.table(
        { className: "Table" },
        React.DOM.thead(null, React.DOM.tr(null, tableHeaderCode)),
        React.DOM.tbody(null, tableBodyCode)
      )
    );
  },
});
