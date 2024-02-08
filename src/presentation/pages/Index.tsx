import React from "react";
import Flex from "antd/lib/flex";
import Image from "antd/lib/image";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import logo from "../../assets/logo.png";
import Col from "antd/lib/col";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./styles/index.css";

const ProductContainer = React.lazy(() => import("../components/ProductContainer"));
const { Text } = Typography;

const Index = () => {
  return (
    <div className="main-div-container">
      <Flex
        className="head-flex-container"
        align="center"
        justify="space-between">
        <Image preview={false} src={logo} width={120} />
        <Flex gap={20}>
          <Button className="contact-us-btn" type="primary">
            Contact us
          </Button>
          <Button className="contact-us-btn" type="primary" icon={<ShoppingCartOutlined />}>
            Cart
          </Button>
        </Flex>
      </Flex>
      <Col span={24} style={{ textAlign: "center", marginTop: 10 }}>
        <Text className="heading-text">Eat well, think well.</Text>
      </Col>

      <ProductContainer />
    </div>
  );
};

export default Index;
