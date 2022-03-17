const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  const products = adminData.products;
  res.render("shop", { prods: products, pageTitle: 'My Shop', path: '/' }); // Will render the template engine file with engine that's set. Second argument is passing data into the template.
});

module.exports = router;
