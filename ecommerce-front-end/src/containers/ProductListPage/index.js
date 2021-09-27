import React, { useEffect, useState } from "react";
import { getProductsBySlug } from "../../actions";
import Layout from "../../component/Layout";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const ProductListPage = (props) => {
  const [priceRange, setPriceRange] = useState({
    under5K: 5000,
    under10K: 10000,
    under15K: 15000,
    under20K: 20000,
    under25K: 25000,
    under30K: 30000,
  });

  const state = useSelector((state) => state);
  const product = state.product;

  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>{props.match.params.slug} Mobile Under {priceRange[key]}</div>
              <button>view all</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <div className="productContainer">
                  <div className="productImgContainer">
                    <img
                      alt=""
                      src={generatePublicUrl(product.productPictures[0].img)}
                    />
                  </div>
                  <div className="productInfo">
                    <div className="productName">{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>4263</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default ProductListPage;
