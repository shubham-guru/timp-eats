import { Col, Divider, Flex, Row, Typography, Image } from 'antd'
import facebook from "../../assets/facebook.svg"
import insta from "../../assets/instagram.svg"
import linkedin from "../../assets/linkedin.svg"

import "./styles/footer.css"
import routes from '../../routes/routes'

const Footer = () => {
    return (
        <Row className="footer-row glassmorphism-effect">
            <Flex justify="space-between" align="center" gap={10}>
                <Col span={8} className="glassmorphism-effect" style={{ padding: "2vmax" }}>
                    <Typography.Title className="footer-title">About us</Typography.Title>
                    <Typography.Text className="footer-subtitle">Our goal isn't just about selling products and making money. We're focused on something bigger:
                        making sure everyone plays a role in improving society. We believe that when people eat well, they're better able
                        to think about the world around them and contribute positively. <br /> It's like our motto says: <br /> जब तक अच्छा आहार नहीं होगा, तब तक अच्छा विचार कैसे होगा ? <br />
                        If you can't eat well, how can you think well ?</Typography.Text>
                </Col>

                <Col span={8} className="glassmorphism-effect" style={{ padding: "2vmax" }}>
                    <Typography.Title className="footer-title">Yes we are Expensive</Typography.Title>
                    <Typography.Text className="footer-subtitle">
                        If you also believe that we are EXPENSIVE, then this one is for you, my friend. Yes, we are expensive! But why? Because health
                        is valuable, being in shape requires investment, following a particular diet comes at a cost, and maintaining discipline is
                        not cheap. All the things that are good for you often come with a price tag, as cheap alternatives often yield the same old,
                        lackluster results. <br /> To maintain quality, we implement numerous checkpoints in our product manufacturing process. Each
                        checkpoint adds to our costs, as does sourcing raw materials. We don't trust just anyone for our supplies; instead, we often
                        buy directly from farmers.
                    </Typography.Text>
                </Col>

                <Col span={8} className="glassmorphism-effect" style={{ padding: "2vmax" }}>
                    <Typography.Title className="footer-title">Eat well = Think well</Typography.Title>
                    <Typography.Text className="footer-subtitle">
                        This company believes in a simple idea: "Good food equals good thinking." We're convinced that when you eat well, you think well.
                        And when your mind is sharp, you can achieve great things. We're more than just a food brand; we're on a mission to empower
                        people to make a positive difference in the world.
                    </Typography.Text>
                </Col>

            </Flex>
            <Divider />

            <Typography.Title className="footer-title">Let's Connect</Typography.Title>
            <Flex justify="space-between" style={{ width: "100%", marginTop: "2%" }} align="center">
                <Flex gap={20}>
                    <Image preview={false} className="icon-img" src={facebook} alt="facebook_icon" width={50} />
                    <Image preview={false} className="icon-img" src={insta} alt="instagram_icon" width={50} />
                    <Image preview={false} className="icon-img" src={linkedin} alt="linkedin_icon" width={50} />
                </Flex>

                <Flex vertical>
                    <Typography.Link href="tel:8955288660" className="footer-link-text">+91-8955288660</Typography.Link>
                    <Typography.Link href="mailto:timpeats0@gmail.com" className="footer-link-text">timpeats0@gmail.com</Typography.Link>
                </Flex>
            </Flex>

            <Divider />

            <Flex justify="space-between" style={{width: "100%"}}>
                <Typography.Text>Copyright &#169; Timp Eats</Typography.Text>
                <Typography.Link href={routes.PRIVACYPOLICY}>Privacy Policy</Typography.Link>
            </Flex>
        </Row>
    )
}

export default Footer