import { Col, Row } from 'antd';
import React from 'react'
import Navbar from '../components/Navbar';
import routes from '../../routes/routes';
import Footer from '../components/Footer';
import "./styles/layout.css"

type ILayoutPage = {
    Children: any;
}
const LayoutPage: React.FC<ILayoutPage> = ({ Children }) => {
    const url = window.location.href;
    const isCart = url.includes(routes.CART);
    
  return (
    <Row className="main-row-container">
        <Col span={24}>
            <Navbar isCart={!isCart} />
          {Children}
          <Footer />
        </Col>
    </Row>
  )
}

export default LayoutPage