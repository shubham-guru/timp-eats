import React, { useState } from 'react'
import { Col, Row, Typography, Image, Flex, Modal, Divider, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store/store';
import { DeleteOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import routes from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../../redux/slice/cartSlice';
import emptyCart from "../../assets/cart.png"
import { calculateTotalPrice } from '../../data/helpers/totalPrice';
import "./styles/cart.css"


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productObj = useSelector((state: RootState) => state.cartProducts.productDetails)
    const [productId, setProductId] = useState<number>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleConfirm = (type: string) => {
        if (type === "keep") {
            handleCancel();
            messageApi.success("Thank you")
        } else {
            dispatch(removeProduct(productId))
            handleCancel();
        }
    }

    const handleDelete = (id: number) => {
        setProductId(id)
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const totalPrice = calculateTotalPrice(productObj)


    return (
        <Row className="cart-page-row" gutter={[0, 30]}>
            {contextHolder}
            {
                productObj.length ?
                    <Col span={24}>
                        <Row>
                            <Col span={12}>
                                <Typography.Title className="cart-heading-text">Cart</Typography.Title>
                            </Col>
                            <Col span={12}>
                                <Typography.Title className="cart-heading-text" style={{ textAlign: "right" }}>Total: {totalPrice.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'INR'
                                })}</Typography.Title>
                            </Col>
                        </Row>

                        <Col span={24} className="cart-product-details-col">
                            <Flex align="center" justify="space-between">
                                <Typography.Title className="cart-heading-subtitle">Product Details</Typography.Title>
                                <Button className="primary-us-btn"
                                    onClick={() => navigate(routes.CHECKOUT)}
                                    type="primary">Checkout <ArrowRightOutlined /></Button>
                            </Flex>
                            {
                                productObj?.map((item: { productInfo: productInfoInterface, id: number }, index: number) => {
                                    return (
                                        <Col key={index} span={24} className="product-details-col">
                                            <Flex align="center" justify="space-between">
                                                <Image src={item?.productInfo?.img} alt={`${item?.productInfo.name}-pic`} width={150} className="product-img" />
                                                <Typography.Text className="cart-product-text">{item?.productInfo.name}</Typography.Text>
                                                <Flex align="center">
                                                    {/* <PlusOutlined className="action-btns" onClick={() => handleUnitChange("add", units ? units : item.productInfo.units)} /> */}
                                                    <Typography.Text className="cart-product-text">{item.productInfo.units} {item.productInfo.units > 1 ? "Units" : "Unit"}</Typography.Text>
                                                    {/* <MinusOutlined className="action-btns" onClick={() => handleUnitChange("minus", units ? units : item.productInfo.units)} /> */}
                                                </Flex>

                                                <Flex align="center">
                                                    {/* <PlusOutlined className="action-btns" /> */}
                                                    <Typography.Text className="cart-product-text">{item.productInfo.quantity} {item.productInfo.qtyLabel.includes("kg") ? "kg" : "g"}</Typography.Text>
                                                    {/* <MinusOutlined className="action-btns" /> */}
                                                </Flex>

                                                <Typography.Text className="cart-product-text">&#8377; {item?.productInfo.totalPrice}</Typography.Text>
                                                <DeleteOutlined id="delete-icon" onClick={() => handleDelete(item.id)} />
                                            </Flex>

                                            {/* Confirm Delete Modal */}
                                            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                <Typography className="modal-heading">Are you sure ? </Typography>
                                                <Divider />
                                                <Typography.Text className="delete-modal-text">But this tastes very good. You should definitely try this :) </Typography.Text>
                                                <Flex gap={10} style={{ marginTop: "2vmax" }}>
                                                    <Button style={{ width: "100%" }} type="default" onClick={() => handleConfirm("remove")}>remove it !</Button>
                                                    <Button className="primary-us-btn" style={{ width: "100%" }} onClick={() => handleConfirm("keep")} type="primary">KEEP IT !</Button>
                                                </Flex>
                                            </Modal>

                                        </Col>
                                    )
                                })
                            }
                        </Col>
                        <Col span={24}>
                            <Button className="primary-us-btn cart-btn"
                                onClick={() => navigate(routes.CHECKOUT)}
                                type="primary">Checkout <ArrowRightOutlined /></Button>
                        </Col>
                    </Col> :
                    // Show Empty Cart Image
                    <Flex align='center' justify='center' vertical style={{ width: "100%" }}>
                        <Image preview={false} src={emptyCart} alt="empty-cart" width={400} />
                        <Typography.Text>No Products in the cart !</Typography.Text>
                        <Button className="primary-us-btn" style={{ width: "30%", marginTop: "1vmax" }} onClick={() => navigate(routes.HOME)} type="primary">Go to Shop</Button>
                    </Flex>
            }
        </Row>
    )
}

export default Cart