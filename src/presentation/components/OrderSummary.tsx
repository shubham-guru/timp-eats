import { Col, Table, Typography, Flex, Divider } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface'
import { calculateTotalPrice } from '../../data/helpers/totalPrice'

const OrderSummary = () => {
    const productObj = useSelector((state: RootState) => state.cartProducts.productDetails)

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
    const totalQty: any[] = productObj?.map((item: any) => {
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
                    {(quantitySum > 1 ? totalPrice : totalPrice + 45).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'INR'
                    })}
                </Typography.Text>
            </Flex>


        </Col>
    )
}

export default OrderSummary