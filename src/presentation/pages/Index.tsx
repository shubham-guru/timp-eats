import React from "react";
import { Typography, Col, Row } from "antd";
import "./styles/index.css";

const ProductContainer = React.lazy(() => import("../components/ProductContainer"));

const Index = () => {

  return (
    <Row>
      <Col span={24} style={{ marginTop: 10 }}>
        <Typography.Text className="heading-text">Eat well, think well.</Typography.Text>
        <ProductContainer />
      </Col>
    </Row>
  );
};

export default Index;
