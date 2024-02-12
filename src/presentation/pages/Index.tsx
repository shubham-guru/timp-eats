import React from "react";
import Flex from "antd/lib/flex";
import Image from "antd/lib/image";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import logo from "../../assets/logo.png";
import Col from "antd/lib/col";
import Badge from "antd/lib/badge";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { RootState } from '../../redux/store/store';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "../../routes/routes";
import "./styles/index.css";

const ProductContainer = React.lazy(() => import("../components/ProductContainer"));
const { Text } = Typography;

const Index = () => {
  const productObj = useSelector((state: RootState) => state.products)
  const navigate = useNavigate();

  return (
    <div className="main-div-container">
      <Flex
        className="head-flex-container"
        align="center"
        justify="space-between">
        <Image preview={false} src={logo} width={120} />
        <Flex gap={20}>
          <Button className="primary-us-btn" type="primary">
            Contact us
          </Button>
          <Badge count={productObj?.length}>
            <Button className="primary-us-btn" onClick={() => navigate(routes.CART)} type="primary" icon={<ShoppingCartOutlined />}>
              Cart
            </Button>
          </Badge>
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
