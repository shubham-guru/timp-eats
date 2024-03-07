import { useState } from 'react'
import { Col, Table, Typography, Flex, Divider, Button, message } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../../assets/logo.png"
import { RootState } from '../../redux/store/store'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface'
import { calculateTotalPrice } from '../../data/helpers/totalPrice'
import { formUserDataInterface } from '../../domain/interfaces/formUserDataInterface'
import { PaymentTypes } from '../../domain/constants/paymentsTypes'
import routes from '../../routes/routes'
import { useNavigate } from 'react-router-dom'
import { removeAllProducts } from '../../redux/slice/cartSlice'

type IOrderSummaryType = {
    userData: formUserDataInterface
    isLoading: (value: boolean) => void;
}

const baseUrl = import.meta.env.VITE_BSE_URL
const razorpay_key = import.meta.env.VITE_RAZORPAY_API_KEY

const OrderSummary: React.FC<IOrderSummaryType> = ({ userData, isLoading }) => {
    const productObj = useSelector((state: RootState) => state.cartProducts.productDetails);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedPayment, setSelectedPayment] = useState<string>(PaymentTypes.PAYNOW);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        const completeAddress = userData.complete_address || {};
        const allValuesFilled = Object.values(userData).every(value => {
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            return true;
        });

        const allAddressValuesFilled = Object.values(completeAddress).every((value: any) => {
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            return true;
        });


        if (allValuesFilled && allAddressValuesFilled) {
            
            const str = calculatePriceWithDelivery();
            const numberString = str.replace(/[^\d.]/g, '');
            const totalAmt = parseFloat(numberString);
            isLoading(true)
            const { data: { order } }: any = await axios.post(baseUrl + "/order", {
                user: userData,
                order: {
                    payment_mode: selectedPayment,
                    order_detail: productObj,
                    total_price: totalAmt,
                    tax: 0,
                    delievery_charge: quantitySum >= 3 ? "FREE" : "₹49",
                    status: "cart"
                },
                amount: totalAmt
            }).then((res) => {
                if(res?.data) isLoading(false)
                if(selectedPayment === PaymentTypes.COD) {
                    messageApi.success("Order Placed Successfully")
                    setTimeout(() => {
                        dispatch(removeAllProducts())
                        navigate(routes.HOME)
                    }, 3000)
                }
            }).catch((err) => {
                messageApi.error("Something went wrong")
                console.log("🚀 ~ handleCheckout ~ err:", err)
            }) 

            if(selectedPayment === PaymentTypes.PAYNOW) {
                const options = {
                    razorpay_key,
                    amount: order.amount,
                    currency: "INR",
                    name: "Timp Eats",
                    description: "Payment for order",
                    image: logo,
                    order_id: order.id,
                    callback_url: baseUrl + "/getPaymentConfirmation",
                    prefill: {
                        name: userData.full_name,
                        email: userData.email,
                        contact: userData.phone_number
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

                {/* <Flex className={`glassmorphism-effect ${selectedPayment === PaymentTypes.PAYNOW ? 'selected-payment' : ''}`}
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
                </Flex> */}
            </Flex> <br />
            <Button type="primary" className="primary-us-btn cart-btn" onClick={handleCheckout}>Pay & Checkout</Button>

        </Col>
    )
}

export default OrderSummary