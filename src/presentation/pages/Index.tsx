import React from "react";
import { Typography, Col } from "antd";
import "./styles/index.css";

const ProductContainer = React.lazy(() => import("../components/ProductContainer"));
const { Text } = Typography;

const Index = () => {

  return (
    <div className="main-div-container">
      <Col span={24} style={{ textAlign: "center", marginTop: 10 }}>
        <Text className="heading-text">Eat well, think well.</Text>
      </Col>
      <ProductContainer />
    </div>
  );
};

export default Index;
