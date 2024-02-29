import { useState } from 'react'
import { Col, Table, Typography, Flex, Divider, Button, message } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import logo from "../../assets/logo.png"
import { RootState } from '../../redux/store/store'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface'
import { calculateTotalPrice } from '../../data/helpers/totalPrice'
import { formUserDataInterface } from '../../domain/interfaces/formUserDataInterface'
import { PaymentTypes } from '../../domain/constants/paymentsTypes'

type IOrderSummaryType = {
    userData: formUserDataInterface
}
const OrderSummary: React.FC<IOrderSummaryType> = ({ userData }) => {
    const productObj = useSelector((state: RootState) => state.cartProducts.productDetails);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedPayment, setSelectedPayment] = useState<string>(PaymentTypes.PAYNOW);

    const productsData = productObj.map((item: { productInfo: productInfoInterface }, index: number) => {
        return {
            key: index,
            name: item.productInfo.name,
            qty: `${item.productInfo.quantity} ${item.productInfo.qtyLabel.includes("kg") ? "kg" : "g"}`,
            price: `₹${item.productInfo.totalPrice}`,
            units: item.productInfo.units
        }
    })

    const totalPrice = calculateTotalPrice(productObj);

    // Calculating Total Qty of Products in KGs
    const totalQty: any[] = productObj?.map((item: { productInfo: productInfoInterface }) => {
        if (item.productInfo.qtyLabel.includes("kg")) {
            const qty = item.productInfo.qtyLabel.split("kg")[0];
            const total = Number(qty)
            return total * item.productInfo.units
        }
        if (item.productInfo.qtyLabel.includes("g")) {
            const qty = item.productInfo.qtyLabel.split("g")[0];
            const total = qty.length > 1 ? Number(qty) / 1000 : Number(qty)
            return total * item.productInfo.units
        }
    })

    // Total Sum of products qty
    const quantitySum = totalQty?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    const columns = [
        {
            title: <Typography.Text className="order-summary-table-heading">Name</Typography.Text>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <Typography.Text className="order-summary-table-heading">Quantity</Typography.Text>,
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: <Typography.Text className="order-summary-table-heading">Units</Typography.Text>,
            dataIndex: 'units',
            key: 'units',
        },
        {
            title: <Typography.Text className="order-summary-table-heading">Price</Typography.Text>,
            dataIndex: 'price',
            key: 'price',
        },
    ];

    const calculatePriceWithDelivery = () => {
        const checkoutAmt = (quantitySum > 1 ? totalPrice : totalPrice + 45).toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR'
        })
        return checkoutAmt
    }

    const handleCheckout = async () => {
        const isData = Object.values(userData)
        const allValuesFilled = isData.every(value => value.trim() !== '');

        if (allValuesFilled) {

            if (selectedPayment === PaymentTypes.PAYNOW) {
                const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey");

                const str = calculatePriceWithDelivery();
                const numberString = str.replace(/[^\d.]/g, '');
                const totalAmt = parseFloat(numberString);

                const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
                    amount: totalAmt
                })

                const options = {
                    key,
                    amount: order.amount,
                    currency: "INR",
                    name: "Timp Eats",
                    description: "Payment for order",
                    image: logo,
                    order_id: order.id,
                    callback_url: "https://nbz0awbsjf.execute-api.us-east-1.amazonaws.com/dev/getPaymentConfirmation",
                    prefill: {
                        name: userData.name,
                        email: userData.email,
                        contact: userData.phone
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "#121212"
                    }
                };
                const razor = (window as any).Razorpay(options)
                razor.open();
            } else {
                messageApi.success("Order Placed")
            }

        } else {
            messageApi.error("Kindly fill all the details in the form")
        }


    }
    const dataSource = productsData;

    return (
        <Col className="order-summary-main-col glassmorphism-effect">
            <Typography.Text className="heading-md">Order Summary</Typography.Text>
            {contextHolder}
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            <Flex className="order-summary-flex" justify="space-between">
                <Typography.Text className="order-summary-footer-text">Delivery</Typography.Text>
                <Typography.Text className="order-summary-footer-text free-del-text">{quantitySum >= 3 ? "FREE" : "₹49"}</Typography.Text>
            </Flex> <br />
            <Typography.Text className="order-summary-footer-text"> <i> Add <Typography.Text mark> {(3 - quantitySum) * 1000} grams</Typography.Text>  more to remove delivery cost </i></Typography.Text>
            <Divider />

            <Flex vertical gap={15}>
                <Flex className={`glassmorphism-effect ${selectedPayment === PaymentTypes.COD ? 'selected-payment' : ''}`}
                    style={{ padding: "3%" }} align="center"
                    onClick={() => setSelectedPayment(PaymentTypes.COD)}>
                    <Col span={20}>
                        <Typography.Title className="footer-title">COD</Typography.Title>
                        {selectedPayment === PaymentTypes.COD ? <Typography.Text><i>It's our first step of believing in each other. </i></Typography.Text> : null}
                    </Col>
                    <Col>
                        {selectedPayment === PaymentTypes.COD ? <Typography.Text className="order-summary-footer-text" style={{ color: "green" }}>
                            {calculatePriceWithDelivery()}
                        </Typography.Text> : null}
                    </Col>
                </Flex>

                <Flex className={`glassmorphism-effect ${selectedPayment === PaymentTypes.PAYNOW ? 'selected-payment' : ''}`}
                    style={{ padding: "3%" }} align="center"
                    onClick={() => setSelectedPayment(PaymentTypes.PAYNOW)}>
                    <Col span={20}>
                        <Typography.Title className="footer-title">Pay Now</Typography.Title>
                        {selectedPayment === PaymentTypes.PAYNOW ? <Typography.Text ><i>Looks like you already trust us :) </i></Typography.Text> : null}
                    </Col>
                    <Col>
                        {selectedPayment === PaymentTypes.PAYNOW ? <Typography.Text className="order-summary-footer-text" style={{ color: "green" }}>
                            {calculatePriceWithDelivery()}
                        </Typography.Text> : null}
                    </Col>
                </Flex>
            </Flex> <br />
            <Button type="primary" className="primary-us-btn cart-btn" onClick={handleCheckout}>Pay & Checkout</Button>

        </Col>
    )
}

export default OrderSummary