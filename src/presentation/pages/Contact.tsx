import { Col, Row, Typography } from 'antd'
import { contactInfo } from '../../domain/constants/contactInfo'
import "./styles/contact.css"

const Contact = () => {
  return (
    <Row>
        <Col span={24} className="contact-col glassmorphism-effect">
            <Typography.Title>Let's Talk</Typography.Title>
              {
                contactInfo?.map((item, index) => {
                    return(
                        <Col span={24} key={index}>
                            <Typography.Text>{item.title} : </Typography.Text>
                            <Typography.Link>{item.value}</Typography.Link>
                        </Col>
                    )
                })
              }
        </Col>
    </Row>
  )
}

export default Contact