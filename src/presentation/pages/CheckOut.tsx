import { useEffect, useState } from 'react'
import { Col, Flex, Form, Input, Row, Typography, message } from 'antd'
import OrderSummary from '../components/OrderSummary'
import PhoneInput, { Country } from 'react-phone-number-input'
import { FetchData } from '../../data/Apis/FetchData'
import { LoadingOutlined } from "@ant-design/icons"
import { pincodeUrl } from '../../domain/constants/Urls'
import { IUserAddress } from '../../domain/interfaces/formUserDataInterface'
import { timeZones } from "../../domain/constants/timeZones";
import 'react-phone-number-input/style.css'
import "./styles/checkout.css"

const CheckOut = () => {

  const apiKey = import.meta.env.VITE_PINCODE_API_KEY;

  const initialAddress: IUserAddress = {
    street: "",
    city: "",
    landmark: "",
    state: "",
    country: "",
    pincode: ""
  };

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    complete_address: [initialAddress],
    phone_number: ""
  })
  const [countryCode, setCountryCode] = useState("IN");
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const timeZone = localStorage.getItem("timeZone");

  useEffect(() => {
    if (timeZone === timeZones.INDIA) {
      setCountryCode("IN");
    } else if (timeZone?.includes(timeZones.UK)) {
      setCountryCode("England");
    } else if (timeZone?.includes(timeZones.USA)) {
      setCountryCode("US");
    } else {
      setCountryCode("US");
    }
  }, [timeZone]);

  const handlePinCode = async (e: { target: { name: string, value: string } }) => {
    if (e.target.name === "pincode") {

      const { value } = e.target;
      const updatedAddress = [...formValues.complete_address];
      if (updatedAddress.length > 0) {
        updatedAddress[0].pincode = value;
        setFormValues({ ...formValues, complete_address: updatedAddress });
      }
      
      const params = {
        codes: value,
        // country: countryCode,
        apikey: apiKey
      };

      if (value.length >= 5) {
        setLoading(true);
        FetchData(pincodeUrl, params, (result) => {
          setLoading(false);
          if (Object.values(result?.results).length === 0) {
            messageApi.error("No City, State & Country found");
            setFormValues(prevFormValues => ({
              ...prevFormValues,
              complete_address: [{
                ...prevFormValues.complete_address[0],
                city: "",
                state: "",
                country: "",
              }]
            }));
            return;
          }

          const pinCodeData: any = Object.values(result?.results)[0];
          
          const city = pinCodeData[0]?.city;
          const state = pinCodeData[0]?.state;
          const country = pinCodeData[0]?.country_code;
          const pincode = value

          setFormValues(prevFormValues => ({
            ...prevFormValues,
            complete_address: [{
              ...prevFormValues.complete_address[0],
              city,
              state,
              country,
              pincode
            }]
          }));
        });
      }
    }
  };


  const handleSubmit = () => {
    console.log(formValues)
  }

  return (
    <Row gutter={[0, 20]} justify="space-between" style={{ marginBottom: "2%" }}>
     { loader ?  <span className="loader"></span> : null}
      {contextHolder}
      <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
        <Typography.Text className="checkout-note">Don't think too much, you are ordering health</Typography.Text>
      </Col>


      <Col xs={24} lg={10} className="checkout-form-col glassmorphism-effect" style={{ padding: "25px" }}>
        <Typography.Title className="heading-md">Enter Address</Typography.Title>
        <Form form={form} layout='vertical' autoComplete='off' onFinish={handleSubmit}>
          <Flex align='center' justify="space-between">
            {/* Full Name */}
            <Form.Item label="Full Name"
              required style={{ width: "40%" }}
              rules={[{ required: true, message: 'Please input your FullName!' }]}
            >
              <Input placeholder="Full Name" onChange={(e) => setFormValues({ ...formValues, full_name: e.target.value })} />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item label="Phone Number" required
              style={{ width: "50%" }}
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
            >
              <PhoneInput
                addInternationalOption={false}
                defaultCountry="IN"
                value={formValues.phone_number}
                onChange={(value: string) => setFormValues({ ...formValues, phone_number: value })}
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
            <Input placeholder="House/Floor No. Building Name or Street, Locality" onChange={(e) => {
              const { value } = e.target;
              const updatedAddress = [...formValues.complete_address];
              if (updatedAddress.length > 0) {
                updatedAddress[0].street = value;
                setFormValues({ ...formValues, complete_address: updatedAddress });
              }
            }} />
          </Form.Item>

          {/* LandMark */}
          <Form.Item label="Landmark" required
            rules={[{ required: true, message: 'Please input your Landmark!' }]}
          >
            <Input placeholder="Any nearby post office, market, Hospital as the landmark"
              onChange={(e) => {
                const { value } = e.target;
                const updatedAddress = [...formValues.complete_address];
                if (updatedAddress.length > 0) {
                  updatedAddress[0].landmark = value;
                  setFormValues({ ...formValues, complete_address: updatedAddress });
                }
              }} />
          </Form.Item>

          <Flex justify='space-between'>
            {/* Pincode */}
            <Form.Item label="Pincode" required
              rules={[{ required: true, message: 'Please input your Pincode!' }]}
            >
              <Flex align='center' gap={5}>
                <Input placeholder="Pin Code" value={formValues.complete_address[0]?.pincode} name="pincode" onChange={handlePinCode} />
                {loading && <LoadingOutlined />}
              </Flex>
            </Form.Item>

            {/* City */}
            <Form.Item label="City" required>
              <Input placeholder="City" readOnly value={formValues.complete_address[0]?.city} />
            </Form.Item>

            {/* State */}
            <Form.Item label="State" required>
              <Input readOnly placeholder="State" value={formValues.complete_address[0]?.state} />
            </Form.Item>
          </Flex>

          {/* Country */}
          <Form.Item label="Country" required>
            <Input readOnly placeholder="Country" value={formValues.complete_address[0]?.country} />
          </Form.Item>
        </Form>
      </Col>

      {/* Order Summary Card */}
      <Col xs={24} lg={10}>
        <OrderSummary userData={formValues} isLoading={(value: boolean) => setLoader(value)} />
      </Col>
    </Row>
  )
}

export default CheckOut