import { Typography, Col, Row } from "antd";
import ProductContainer from "../components/ProductContainer";
import "./styles/index.css";


const Index = () => {

  return (
    <Row>
      <Col span={24} style={{ marginTop: 10 }}>
        <Typography.Text className="heading-text glassmorphism-effect">Eat well, think well.</Typography.Text>
        <ProductContainer />
      </Col>
    </Row>
  );
};

export default Index;
