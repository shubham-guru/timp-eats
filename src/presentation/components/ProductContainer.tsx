import React from "react";
import Col from "antd/lib/col";
import { productInfo } from "../../domain/productInfo";

import "./styles/productContainer.css"

const ProductContainer = () => {

  const ProductCard = React.lazy(() => import("./ProductCard"))

  return (
    <Col span={24} style={{ margin: 20 }}>
      {
        productInfo.map((item: any, index: number) => {
          return (
            <ProductCard productInfo={item} key={index} />
          )
        })
      }
    </Col>
  );
};

export default ProductContainer;
