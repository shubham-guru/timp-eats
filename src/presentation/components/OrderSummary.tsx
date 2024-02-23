import { Col, Table, Typography, Flex, Divider, Button } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface'
import { calculateTotalPrice } from '../../data/helpers/totalPrice'
import { formUserDataInterface } from '../../domain/interfaces/formUserDataInterface'
import axios from 'axios'

type IOrderSummaryType = {
    userData: formUserDataInterface
}
const OrderSummary: React.FC<IOrderSummaryType> = ({ userData }) => {
    console.log("🚀 ~ userData:", userData)
    const productObj = useSelector((state: RootState) => state.cartProducts.productDetails);

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
        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey");

        const str = calculatePriceWithDelivery();
        const numericPart = str.match(/\d+(\.\d+)?/);
        const totalAmt = parseFloat(numericPart[0]);

        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
            amount : totalAmt
        })

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Timp Eats",
            description: "Payment for order",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: userData.name,
                email: "",
                contact: userData.phone
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        // const razor = new window.Razorpay(options);
        // razor.open();
    }

    const dataSource = productsData;

    return (
        <Col className="order-summary-main-col">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            <Flex className="order-summary-flex" justify="space-between">
                <Typography.Text className="order-summary-footer-text">Delivery</Typography.Text>
                <Typography.Text className="order-summary-footer-text free-del-text">{quantitySum > 2 ? "FREE" : "₹49"}</Typography.Text>
            </Flex>
            <Divider />
            <Flex className="order-summary-flex" justify="space-between">
                <Typography.Text className="order-summary-footer-text">Total</Typography.Text>
                <Typography.Text className="order-summary-footer-text">
                    {calculatePriceWithDelivery()}
                </Typography.Text>
            </Flex> <br />
            <Button type="primary" className="primary-us-btn cart-btn" onClick={handleCheckout}>Pay & Checkout</Button>

        </Col>
    )
}

export default OrderSummary