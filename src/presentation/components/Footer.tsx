import { Col, Divider, Flex, Row, Typography, Image, Button } from 'antd'
import facebook from "../../assets/facebook.svg"
import insta from "../../assets/instagram.svg"
import linkedin from "../../assets/linkedin.svg"
import routes from '../../routes/routes'
import { useNavigate } from 'react-router-dom'

import "./styles/footer.css"

const Footer = () => {

    const navigate = useNavigate();
    return (
        <Row className="footer-row glassmorphism-effect" justify="space-evenly" gutter={[0, 20]}>
            <Col xs={24} lg={7} className="glassmorphism-effect" style={{ padding: "2vmax" }}>
                <Typography.Title className="heading-md">About us</Typography.Title>
                <Typography.Text className="footer-subtitle">Our goal isn't just about selling products and making money. We're focused on something bigger:
                    making sure everyone plays a role in improving society. We believe that when people eat well, they're better able
                    to think about the world around them and contribute positively. <br /> It's like our motto says: <br /> जब तक अच्छा आहार नहीं होगा, तब तक अच्छा विचार कैसे होगा ? <br />
                    If you can't eat well, how can you think well ?</Typography.Text>
            </Col>
            <Col xs={24} lg={7} className="glassmorphism-effect" style={{ padding: "2vmax" }}>
                <Typography.Title className="heading-md">Yes we are Expensive</Typography.Title>
                <Typography.Text className="footer-subtitle">
                    If you also believe that we are EXPENSIVE, then this one is for you, my friend. Yes, we are expensive! But why? Because health
                    is valuable, being in shape requires investment, following a particular diet comes at a cost, and maintaining discipline is
                    not cheap. All the things that are good for you often come with a price tag, as cheap alternatives often yield the same old,
                    lackluster results. <br /> To maintain quality, we implement numerous checkpoints in our product manufacturing process. Each
                    checkpoint adds to our costs, as does sourcing raw materials. We don't trust just anyone for our supplies; instead, we often
                    buy directly from farmers.
                </Typography.Text>
            </Col>

            <Col xs={24} lg={7} className="glassmorphism-effect" style={{ padding: "2vmax" }}>
                <Typography.Title className="heading-md">Eat well = Think well</Typography.Title>
                <Typography.Text className="footer-subtitle">
                    This company believes in a simple idea: "Good food equals good thinking." We're convinced that when you eat well, you think well.
                    And when your mind is sharp, you can achieve great things. We're more than just a food brand; we're on a mission to empower
                    people to make a positive difference in the world.
                </Typography.Text>
            </Col>

            <Divider />

            <Col xs={12} lg={24}>
                <Typography.Title className="heading-md">Let's Connect</Typography.Title>
            </Col>

            <Flex justify="space-between" style={{ width: "100%" }} align="center">
                <Flex gap={20}>
                    <Image preview={false} className="icon-img" src={facebook} alt="facebook_icon" width={50} />
                    <Image preview={false} className="icon-img" src={insta} alt="instagram_icon" width={50} />
                    <Image preview={false} className="icon-img" src={linkedin} alt="linkedin_icon" width={50} />
                </Flex>

                <Flex vertical align="flex-end">
                    <Typography.Link href="tel:8955288660" className="footer-link-text">+91-8955288660</Typography.Link>
                    <Typography.Link href="mailto:admin@timpeats.com" className="footer-link-text">admin@timpeats.com</Typography.Link>
                    <Typography.Link className="footer-link-text" target="_blank" href="https://maps.app.goo.gl/oxDpv6V3z7MefuCi7">Sector 11, Hiran Magri, Udaipur, Rajasthan, India, 313001</Typography.Link>
                </Flex>
            </Flex>

            <Divider />

            <Flex justify="space-between" style={{ width: "100%" }}>
                <Typography.Text>Copyright &#169; Timp Eats</Typography.Text>
                <Button type="link" onClick={() => navigate(routes.PRIVACYPOLICY)}>Privacy Policy</Button>
            </Flex>
        </Row>
    )
}

export default Footer