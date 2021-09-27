import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/LayOut";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";

const Category = () => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const state = useSelector((state) => state);
  const category = state.category;

  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setShow(false);
  };

  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>,
      );
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <>
      <Layout sidebar>
        <Container className="my-2">
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Category</h3>
                <Button variant="primary" onClick={handleShow}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <ul>{renderCategories(category.categories)}</ul>
            </Col>
          </Row>
        </Container>
      </Layout>

      <NewModal
        show={show}
        handleClose={handleClose}
        title={"Add New Category"}
        buttonTitle={"Add Category"}>
        <Input
          Label="Category Name"
          placeholder="Category Name"
          type="text"
          required={true}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <select
          className="form-control Default"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}>
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Input
          className="my-3"
          type="file"
          name="CategoryImage"
          onChange={handleCategoryImage}
        />
      </NewModal>
    </>
  );
};

export default Category;
