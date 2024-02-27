import { Typography, Col, Row } from "antd";
import ProductContainer from "../components/ProductContainer";
import "./styles/index.css";


const Index = () => {

  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Typography.Text className="heading-text glassmorphism-effect">Eat well, think well.</Typography.Text>
      </Col>
      <Col span={24}>
        <ProductContainer />
      </Col>
    </Row>
  );
};

export default Index;
