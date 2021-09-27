import React, { useState } from "react";
import Layout from "../../components/LayOut";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions";
import NewModal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const Products = () => {
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [qunatity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDecsription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPicture, setProductPicture] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  const state = useSelector((state) => state);
  const category = state.category;
  const product = state.product;

  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append("name", productName);
    form.append("quantity", qunatity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPicture) {
      form.append("productPictures", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 14 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            {/* <th>Decsription</th> */}
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  onClick={() => showProductDetailsModal(product)}
                  key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        title={"Add New Products"}
        buttonTitle={"Add Product"}>
        <Input
          Label="Product Name"
          placeholder="Product Name"
          type="text"
          required={true}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          Label="Quantity"
          placeholder="Quantity"
          type="text"
          required={true}
          value={qunatity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          Label="Price"
          placeholder="Price"
          type="text"
          required={true}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          Label="Decsription"
          placeholder="Decsription"
          type="text"
          required={true}
          value={description}
          onChange={(e) => setDecsription(e.target.value)}
        />
        
        <select
          className="form-control Default"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPicture.length > 0
          ? productPicture.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <Input
          className="my-3"
          type="file"
          name="CategoryImage"
          onChange={handleProductPictures}
        />
      </NewModal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        title={"Product Details"}
        buttonTitle="Close"
        size="lg">
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key mx-5">Price</label>
            <p className="value mx-5">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key mx-5">Category</label>
            <p className="value mx-5">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Picture</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container className="my-2">
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}

      {renderProductDetailModal()}
    </Layout>
  );
};

export default Products;
