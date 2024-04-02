import { useState } from 'react'
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
    const [productId, setProductId] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const currencySym = localStorage.getItem("currencySym")

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
        <Row gutter={[0, 20]}>
            {contextHolder}
            <Col span={24} className='cart-page-header glassmorphism-effect'>
                <Row justify="space-between">
                    <Col>
                        <Typography.Text className="heading-md">Cart</Typography.Text>
                    </Col>
                    <Col>
                        <Typography.Text className="heading-md" style={{ textAlign: "right" }}>Total: {currencySym} {totalPrice}</Typography.Text>
                    </Col>
                </Row>
            </Col>

            {
                productObj.length ? (
                    <Col span={24}>
                        {
                            productObj?.map((item: { productInfo: productInfoInterface, id: number }, index: number) => {
                                return (
                                    <Col key={index} span={24} className="product-details-col glassmorphism-effect">
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

                                            <Typography.Text className="cart-product-text">{currencySym} {item?.productInfo.totalPrice}</Typography.Text>
                                            <DeleteOutlined id="delete-icon" onClick={() => handleDelete(item.id)} />
                                        </Flex>

                                        {/* Confirm Delete Modal */}
                                        <Modal centered footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="primary-us-btn cart-btn"
                            onClick={() => navigate(routes.CHECKOUT)}
                            type="primary">Checkout <ArrowRightOutlined /></Button>
                    </Col>
                ) : (
                    // Show Empty Cart Image
                    <Flex align='center' justify='center' vertical style={{ width: "100%" }}>
                        <Image preview={false} src={emptyCart} alt="empty-cart" width={400} />
                        <Typography.Text style={{ color: "#fff" }}>No Products in the cart !</Typography.Text>
                        <Button className="primary-us-btn" style={{ width: "30%", margin: "1vmax" }} onClick={() => navigate(routes.HOME)} type="primary">Go to Shop</Button>
                    </Flex>
                )
            }
        </Row>
    )
}

export default Cart