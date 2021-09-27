import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

const MenuHeader = () => {
  const state = useSelector((state) => state);
  const category = state.category;

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={category.slug}> {category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>,
      );
    }

    return myCategories;
  };

  return (
    <div className="menu-header">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
