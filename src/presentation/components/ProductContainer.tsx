import React, { Suspense } from "react";
import Col from "antd/lib/col";
import { productInfo } from "../../domain/productInfo";

import "./styles/productContainer.css"

const ProductContainer = () => {
  const ProductCard = React.lazy(() => import("./ProductCard"))

  return (
    <Col span={24}>
      {
        productInfo.map((item: any, index: number) => {
          return (
            <Suspense fallback="" key={index}><ProductCard productInfo={item}/></Suspense>
          )
        })
      }
    </Col>
  );
};

export default ProductContainer;
