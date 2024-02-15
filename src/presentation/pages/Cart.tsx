import React, { useState } from 'react'
import { Col, Row, Typography, Image, Flex, Modal, Divider, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store/store';
import { PlusOutlined, MinusOutlined, DeleteOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import { removeProduct } from '../../redux/slice/removeProductSlice';
import routes from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import "./styles/cart.css"

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productObj = useSelector((state: RootState) => state.products)
    const [units, setUnits] = useState<number>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    // const handleUnitChange = (action: string, totalUnits: number) => {
    //     if (action === "add") {
    //         setUnits(totalUnits + 1)
    //     } else {
    //         setUnits(totalUnits - 1)
    //     }
    // }
    const handleConfirm = (type: string, id?: number) => {
        if (type === "keep") {
            handleCancel();
            messageApi.success("Thank you")
        } else {
            dispatch(removeProduct(id))
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Row className="cart-page-row" gutter={[0, 30]}>
            {contextHolder}
            <Col span={24}>
                <Typography.Title className="cart-heading-text">Cart</Typography.Title>
            </Col>

            <Col span={24} className="cart-product-details-col">
                <Typography.Title className="cart-heading-subtitle">Product Details</Typography.Title>
                {
                    productObj?.map((item: { productInfo: productInfoInterface, id: number }, index: number) => {
                        return (
                            <Col key={index} span={24} className="product-details-col">
                                <Flex align="center" justify="space-between">
                                    <Image src={item?.productInfo?.img} alt={`${item?.productInfo.name}-pic`} width={150} className="product-img" />
                                    <Typography.Text className="cart-product-text">{item.productInfo.name}</Typography.Text>
                                    <Flex align="center">
                                        {/* <PlusOutlined className="action-btns" onClick={() => handleUnitChange("add", units ? units : item.productInfo.units)} /> */}
                                        <Typography.Text className="cart-product-text">{units ? units : item.productInfo.units} {item.productInfo.units < 1 ? "Units" : "Unit"}</Typography.Text>
                                        {/* <MinusOutlined className="action-btns" onClick={() => handleUnitChange("minus", units ? units : item.productInfo.units)} /> */}
                                    </Flex>

                                    <Flex align="center">
                                        {/* <PlusOutlined className="action-btns" /> */}
                                        <Typography.Text className="cart-product-text">{item.productInfo.quantity} Qty</Typography.Text>
                                        {/* <MinusOutlined className="action-btns" /> */}
                                    </Flex>

                                    <Typography.Text className="cart-product-text">&#8377; {item.productInfo.totalPrice}</Typography.Text>
                                    <DeleteOutlined id="delete-icon" onClick={showModal} />
                                </Flex>


                                {/* Confirm Delete Modal */}
                                <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <Typography className="modal-heading">Are you sure ? </Typography>
                                    <Divider />
                                    <Typography.Text className="delete-modal-text">But this tastes very good. You should definitely try this :) </Typography.Text>
                                    <Flex gap={10} style={{ marginTop: "2vmax" }}>
                                        <Button style={{ width: "100%" }} type="default" onClick={() => handleConfirm("remove", item.id)}>remove it !</Button>
                                        <Button className="primary-us-btn cart-btn" style={{ width: "100%" }} onClick={() => handleConfirm("keep")} type="primary">KEEP IT !</Button>
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
                    style={{ width: "40%" }}
                    type="primary">Checkout <ArrowRightOutlined /></Button>
            </Col>
        </Row>
    )
}

export default Cart