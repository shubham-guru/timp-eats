import { Button, Flex, Typography } from 'antd'
import SuccessIcon from '../../hocs/SuccessIcon'
import { LeftCircleOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import routes from '../../routes/routes'
import { removeAllProducts } from '../../redux/slice/cartSlice'
import "./styles/paymentStatus.css"

const PaymentStatus = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const reference = queryParameters.get("reference");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(reference) {
            dispatch(removeAllProducts())
        }
    }, [])

    return (
    <Flex className="payment-status-flex glassmorphism-effect">
        <SuccessIcon />
        <Typography.Title className="payment-success-head">Payment Successful</Typography.Title>
        <Typography.Text>Payment id: {reference} </Typography.Text> <br />
        <Button type="primary" className="primary-us-btn" onClick={() => navigate(routes.HOME)} icon={<LeftCircleOutlined />}>Order more health</Button>
    </Flex>
  )
}

export default PaymentStatus