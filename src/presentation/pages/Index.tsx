import { Typography, Col, Row } from "antd";
import ProductContainer from "../components/ProductContainer";
import { timeZones } from "../../domain/constants/timeZones";
import "./styles/index.css";


const Index = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  localStorage.setItem("timeZone", timeZone);

  if(timeZone === timeZones.INDIA) {
    localStorage.setItem("currencySym", "₹")
  } else if(timeZone?.includes(timeZones.UK)) {
    localStorage.setItem("currencySym", "€")
  } else if(timeZone?.includes(timeZones.USA)) {
    localStorage.setItem("currencySym", "$")
  } else {
    localStorage.setItem("currencySym", "$")
  }

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
