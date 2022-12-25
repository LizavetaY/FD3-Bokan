const Filter = React.createClass({
  displayName: "Filter",

  propTypes: {
    wordsData: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },

  getInitialState() {
    return {
      wordsData: this.props.wordsData,
      isSort: false,
      filterValue: "",
    };
  },

  transformWordsList() {
    let wordsListData = this.props.wordsData.slice();

    wordsListData = wordsListData.filter((word) =>
      word.includes(this.state.filterValue)
    );

    if (this.state.isSort) {
      wordsListData.sort();
    }

    this.setState({ wordsData: wordsListData });
  },

  sortOnClick() {
    this.setState({ isSort: !this.state.isSort }, this.transformWordsList);
  },

  filterOnChange(event) {
    this.setState({ filterValue: event.target.value }, this.transformWordsList);
  },

  resetOnClick() {
    this.setState({ isSort: false, filterValue: "" }, this.transformWordsList);
  },

  render() {
    const wordsCode = this.state.wordsData.map((word, index) =>
      React.DOM.li({ key: index }, word)
    );

    return React.DOM.div(
      { className: "Content" },
      React.DOM.form(
        null,
        React.DOM.input({
          type: "checkbox",
          checked: this.state.isSort,
          onClick: this.sortOnClick,
        }),
        React.DOM.input({
          type: "text",
          value: this.state.filterValue,
          onChange: this.filterOnChange,
        }),
        React.DOM.input({
          type: "button",
          value: "Reset",
          onClick: this.resetOnClick,
        }),
        React.DOM.div(
          { className: "ListWrapper" },
          React.DOM.ul({ className: "List" }, wordsCode)
        )
      )
    );
  },
});
