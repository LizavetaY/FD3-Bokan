import React from "react";
import ReactDOM from "react-dom";

import { Shop } from "./components/Shop/Shop";

const shopName = "iShop 3";
const productsListHeaders = [
  "Name",
  "Price",
  "Quantity",
  "Photo",
  "Controllers",
];
const productsListData = require("./productsList.json");

ReactDOM.render(
  <Shop
    shopName={shopName}
    headersData={productsListHeaders}
    productsData={productsListData}
  />,
  document.getElementById("root")
);
