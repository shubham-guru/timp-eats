import React, { useState } from 'react'
import { Col, Row, Typography, Image, Flex } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons"
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import "./styles/cart.css"

const Cart = () => {
  const productObj = useSelector((state: RootState) => state.products)
  const [units, setUnits] = useState<number>()
  console.log("🚀 ~ Cart ~ productObj:", productObj)

  const handleUnitChange = (action: string, totalUnits: number) => {
    if(action === "add") {
        setUnits(totalUnits+1)
    } else {
        setUnits(totalUnits-1)
    }
  }

  return (
    <Row className="cart-page-row">
        <Col span={24}>
            <Typography.Title className="cart-heading-text">Cart</Typography.Title> 
        </Col>

            <Col span={24} className="cart-product-details-col">
                <Typography.Title className="cart-heading-subtitle">Product Details</Typography.Title>
                {
                    productObj?.map((item: { productInfo: productInfoInterface }, index: number) => {
                        return(
                            <Col key={index} span={24} className="product-details-col">
                                <Flex align="center" justify="space-between">
                                    <Image src={item?.productInfo?.img} alt={`${item?.productInfo.name}-pic`} width={150} className="product-img" />
                                    <Typography.Text className="cart-product-text">{item.productInfo.name}</Typography.Text>
                                    <Flex align="center">
                                        <Typography.Text className="cart-product-text">{units ? units : item.productInfo.units} {item.productInfo.units < 1 ? "Units" : "Unit"}</Typography.Text>
                                        <Flex vertical>
                                        <PlusOutlined className="action-btns" onClick={() => handleUnitChange("add", units ? units : item.productInfo.units)} />
                                        <MinusOutlined className="action-btns" onClick={() => handleUnitChange("minus", units ? units : item.productInfo.units)}/>
                                        </Flex>
                                    </Flex>

                                    <Flex align="center">
                                    <Typography.Text className="cart-product-text">{item.productInfo.quantity} Qty</Typography.Text>
                                    <Flex vertical>
                                        <PlusOutlined className="action-btns" />
                                        <MinusOutlined className="action-btns" />
                                    </Flex>
                                    </Flex>

                                    <Typography.Text className="cart-product-text">&#8377; {item.productInfo.totalPrice}</Typography.Text>
                                    <DeleteOutlined id="delete-icon" />
                                </Flex>
                            </Col>
                        )
                    })
                }
            </Col>
    </Row>
  )
}

export default Cart