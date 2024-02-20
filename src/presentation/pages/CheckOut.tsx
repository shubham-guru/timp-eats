import React, { useState } from 'react'
import { Button, Col, Flex, Form, Input, Row, Typography, message } from 'antd'
import PhoneInput, { Country } from 'react-phone-number-input'
import { FetchData } from '../../data/Apis/FetchData'
import { LoadingOutlined } from "@ant-design/icons"
import 'react-phone-number-input/style.css'
import "./styles/checkout.css"

const CheckOut = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    pincode: "",
  })
  const [phone, setPhone] = useState<any>();
  const [pinCodeResult, setPinCodeResult] = useState<Array<any>>([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [loading, setLoading] = useState<boolean>(false);

  const pincodeUrl = "https://api.worldpostallocations.com/pincode";

  const handleFormValues = async (e: { target: { name: string, value: string } }) => {
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

  console.log(pinCodeResult)


  return (
    <Row gutter={[0, 20]} style={{ margin: "2%" }}>
      {contextHolder}
      <Col span={24}>
        <Typography.Title className="checkout-head-text">Enter Address</Typography.Title>
      </Col>
      <Col span={12} className="checkout-form-col">
        <Form form={form} layout='vertical' autoComplete='off'>

          <Flex align='center' justify="space-between">
            {/* Full Name */}
            <Form.Item label="Full Name" required style={{ width: "40%" }}>
              <Input />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item label="Phone Number" required style={{ width: "50%" }}>
              <PhoneInput
                addInternationalOption={false}
                defaultCountry="IN"
                value={phone}
                onChange={(value) => setPhone(value)}
                onCountryChange={(countryData: Country) => setCountryCode(countryData)}
              />
            </Form.Item>
          </Flex>

          {/* Address */}
          <Form.Item label="Complete Address" required>
            <Input placeholder="House/Floor No. Building Name or Street, Locality" />
          </Form.Item>

          {/* LandMark */}
          <Form.Item label="Landmark (optional)">
            <Input placeholder="Any nearby post office, market, Hospital as the landmark" />
          </Form.Item>

          <Flex justify='space-between'>
            {/* Pincode */}
            <Form.Item label="Pincode" required>
              <Flex align='center' gap={5}>
                <Input type="number" value={formValues.pincode} name="pincode" onChange={handleFormValues} />
                { loading && <LoadingOutlined />}
              </Flex>
            </Form.Item>

            {/* City */}
            <Form.Item label="City" required>
              <Input readOnly value={pinCodeResult[0]?.district} />
            </Form.Item>

            {/* State */}
            <Form.Item label="State" required>
              <Input readOnly value={pinCodeResult[0]?.state} />
            </Form.Item>
          </Flex>

          {/* Country */}
          <Form.Item label="Country" required>
            <Input readOnly value={pinCodeResult[0]?.country} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default CheckOut