import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/LayOut";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosCloseCircleOutline,
} from "react-icons/io";

const Category = () => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

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
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    const categories = createCategoryList(category.categories);
    const checkedArr = [];
    const expendedArr = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value,
        );
        category && checkedArr.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value,
        );
        category && expendedArr.push(category);
      });

    setCheckedArray(checkedArr);
    setExpandedArray(expendedArr);

    // console.log({checked, expanded, categories, checkedArr, expendedArr})

    setUpdateCategoryModal(true);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item,
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpendedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item,
      );
      setExpandedArray(updatedExpendedArray);
    }
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
                  Add Category
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              {/* <ul>{renderCategories(category.categories)}</ul> */}
              <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <IoIosCheckbox />,
                  uncheck: <IoIosCloseCircleOutline />,
                  halfCheck: <IoIosCheckboxOutline />,
                  expandClose: <IoIosArrowForward />,
                  expandOpen: <IoIosArrowDown />,
                }}
              />
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <Button>Delete Category</Button>
              <Button onClick={updateCategory} className="mx-2">
                Edit Category
              </Button>
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

      {/* Edit Categories */}
      <NewModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        title={"Update Category"}
        buttonTitle={"Update Categories"}
        size="lg">
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  label="Category Name"
                  placeholder="Category Name"
                  value={item.name}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded",
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control Default"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded",
                    )
                  }>
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control Default">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        <h6>Checked Categories</h6>

        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  label="Category Name"
                  placeholder="Category Name"
                  value={item.name}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked",
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control Default"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked",
                    )
                  }>
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control Default">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        {/* <Input
          className="my-3"
          type="file"
          name="CategoryImage"
          onChange={handleCategoryImage}
        /> */}
      </NewModal>
    </>
  );
};

export default Category;
