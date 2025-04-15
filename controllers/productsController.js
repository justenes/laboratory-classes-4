const Product = require("../models/Product");
const { STATUS_CODE } = require("../constants/statusCode");
const { MENU_LINKS } = require("../constants/navigation");

const getProductsView = (_req, res) => {
  const products = Product.getAll();
  res.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/products",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
  });
};


const getAddProductView = (_req, res) => {
  res.render("add-product.ejs", {
    headTitle: "Shop - Add Product",
    path: "/products/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
};

const addNewProduct = (req, res) => {
  const { name, description } = req.body;
  const newProduct = new Product(name, description);
  Product.add(newProduct);
  res.redirect("/products/new");
};

const getNewProductView = (_req, res) => {
  const product = Product.getLast();
  res.render("new-product.ejs", {
    headTitle: "Shop - New Product",
    path: "/products/new",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/new",
    product,
  });
};

const getProductView = (req, res) => {
  const product = Product.findByName(req.params.name);
  res.render("product.ejs", {
    headTitle: "Product Detail",
    path: "/products",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    product,
  });
};

const deleteProduct = (req, res) => {
  const { name } = req.params;
  Product.deleteByName(name);
  res.status(STATUS_CODE.OK).json({ success: true });
};

module.exports = {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct,
};
