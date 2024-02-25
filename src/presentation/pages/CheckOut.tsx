import { useState } from 'react'
import { Col, Flex, Form, Input, Row, Typography, message } from 'antd'
import OrderSummary from '../components/OrderSummary'
import PhoneInput, { Country } from 'react-phone-number-input'
import { FetchData } from '../../data/Apis/FetchData'
import { LoadingOutlined } from "@ant-design/icons"
import { pincodeUrl } from '../../domain/constants/Urls'
import { pinCodeData } from '../../domain/interfaces/pinCodeDataInterface'
import 'react-phone-number-input/style.css'
import "./styles/checkout.css"

const CheckOut = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    address: "",
    pincode: "",
    landmark: "",
    phone: ""
  })
  const [pinCodeResult, setPinCodeResult] = useState<Array<pinCodeData>>([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePinCode = async (e: { target: { name: string, value: string } }) => {
    if (e.target.name === "pincode") {
      setFormValues(prevFormValues => ({
        ...prevFormValues,
        pincode: e.target.value
      }));

      const updatedPincode = e.target.value;

      const params = {
        postalcode: updatedPincode,
        countrycode: countryCode
      }
      if (updatedPincode.length >= 5) {
        setLoading(true);
        FetchData(pincodeUrl, params, (result) => {
          setPinCodeResult(result?.data.result);
          setLoading(false);
          if (result?.data.status === false) {
            messageApi.error("No City, State & Country found")
          }
        });
      }
    }
  }

  const handleSubmit = () => {
    console.log(formValues)
  }

  return (
    <Row gutter={[0, 20]}>
      {contextHolder}
      <Typography.Text className="checkout-note">Don't think too much, you are ordering health</Typography.Text>
      <Col span={24}>
        <Row justify="space-around">
          <Col span={10} className="checkout-form-col">
          <Typography.Title className="checkout-head-text">Enter Address</Typography.Title>
            {/* Address Form */}

            <Form form={form} layout='vertical' autoComplete='off' onFinish={handleSubmit}>
              <Flex align='center' justify="space-between">
                {/* Full Name */}
                <Form.Item label="Full Name"
                  required style={{ width: "40%" }}
                  rules={[{ required: true, message: 'Please input your FullName!' }]}
                >
                  <Input placeholder="Full Name" onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item label="Phone Number" required
                  style={{ width: "50%" }}
                  rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                >
                  <PhoneInput
                    addInternationalOption={false}
                    defaultCountry="IN"
                    value={formValues.phone}
                    onChange={(value: string) => setFormValues({ ...formValues, phone: value })}
                    onCountryChange={(countryData: Country) => setCountryCode(countryData)}
                  />
                </Form.Item>
              </Flex>

              {/* Email */}
              <Form.Item label="Email Address" required
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input placeholder="Email" onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
              </Form.Item>

              {/* Address */}
              <Form.Item label="Complete Address" required
                rules={[{ required: true, message: 'Please input your Address!' }]}
              >
                <Input placeholder="House/Floor No. Building Name or Street, Locality" onChange={(e) => setFormValues({ ...formValues, address: e.target.value })} />
              </Form.Item>

              {/* LandMark */}
              <Form.Item label="Landmark" required 
               rules={[{ required: true, message: 'Please input your Landmark!' }]}
              >
                <Input placeholder="Any nearby post office, market, Hospital as the landmark"
                  onChange={(e) => setFormValues({ ...formValues, landmark: e.target.value })}
                />
              </Form.Item>

              <Flex justify='space-between'>
                {/* Pincode */}
                <Form.Item label="Pincode" required
                  rules={[{ required: true, message: 'Please input your Pincode!' }]}
                >
                  <Flex align='center' gap={5}>
                    <Input type="number" placeholder="Pin Code" value={formValues.pincode} name="pincode" onChange={handlePinCode} />
                    {loading && <LoadingOutlined />}
                  </Flex>
                </Form.Item>

                {/* City */}
                <Form.Item label="City" required>
                  <Input placeholder="City" readOnly value={pinCodeResult[0]?.district} />
                </Form.Item>

                {/* State */}
                <Form.Item label="State" required>
                  <Input readOnly placeholder="State" value={pinCodeResult[0]?.state} />
                </Form.Item>
              </Flex>

              {/* Country */}
              <Form.Item label="Country" required>
                <Input readOnly placeholder="Country" value={pinCodeResult[0]?.country} />
              </Form.Item>
            </Form>

            
          </Col>

            <div className="checkout-divider" />

          {/* Order Summary Card */}
          <Col span={9}>
            <Typography.Title className="checkout-head-text">Order Summary</Typography.Title>
            <Col span={24}>
                <OrderSummary userData={formValues} />
            </Col>
          </Col>

        </Row>
      </Col>
    </Row>
  )
}

export default CheckOut