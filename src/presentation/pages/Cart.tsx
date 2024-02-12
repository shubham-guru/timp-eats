import React from 'react'
import Flex from "antd/lib/flex";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import Row from 'antd/lib/row';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import "./styles/cart.css"

const Cart = () => {
  const productObj = useSelector((state: RootState) => state.products)
  console.log("🚀 ~ Cart ~ productObj:", productObj)

  return (
    <Row className="cart-page-row">
        <Typography.Title>Cart</Typography.Title>

        {/* <Flex> */}
            <Col>
                {
                    productObj?.map((item: { productInfo: productInfoInterface }, index: number) => {
                        return(
                            <Col key={index}>
                                <Typography.Text>{item.productInfo.name}</Typography.Text>
                                <Typography.Text>{item.productInfo.price}</Typography.Text>
                            </Col>
                        )
                    })
                }
            </Col>
        {/* </Flex> */}
    </Row>
  )
}

export default Cart