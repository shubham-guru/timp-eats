import { useEffect, useState } from "react";
import {
  Col,
  Table,
  Typography,
  Flex,
  Divider,
  Button,
  message,
  Row,
  Space,
} from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { RootState } from "../../redux/store/store";
import { productInfoInterface } from "../../domain/interfaces/productInfoInterface";
import { calculateTotalPrice } from "../../data/helpers/totalPrice";
import { formUserDataInterface } from "../../domain/interfaces/formUserDataInterface";
import { PaymentTypes } from "../../domain/constants/paymentsTypes";
import routes from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { removeAllProducts } from "../../redux/slice/cartSlice";
import { timeZones } from "../../domain/constants/timeZones";

type IOrderSummaryType = {
  userData: formUserDataInterface;
  isLoading: (value: boolean) => void;
};

const baseUrl = import.meta.env.VITE_BSE_URL;
const razorpay_key = import.meta.env.VITE_RAZORPAY_API_KEY;

const OrderSummary: React.FC<IOrderSummaryType> = ({ userData, isLoading }) => {
  const productObj = useSelector(
    (state: RootState) => state.cartProducts.productDetails
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedPayment, setSelectedPayment] = useState<string>(
    PaymentTypes.PAYNOW
  );
  const [currency, setCurrency] = useState<string>("");

  const currencySym = localStorage.getItem("currencySym");
  const timeZone = localStorage.getItem("timeZone");

  useEffect(() => {
    if (timeZone === timeZones.INDIA) {
      setCurrency("INR");
    } else if (timeZone?.includes(timeZones.UK)) {
      setCurrency("EUR");
    } else if (timeZone?.includes(timeZones.USA)) {
      setCurrency("USD");
    } else {
      setCurrency("USD");
    }
  }, [timeZone]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsData = productObj.map(
    (item: { productInfo: productInfoInterface }, index: number) => {
      return {
        key: index,
        name: item.productInfo.name,
        qty: `${item.productInfo.quantity} ${
          item.productInfo.qtyLabel.includes("kg") ? "kg" : "g"
        }`,
        price: `${currencySym}${item.productInfo.totalPrice}`,
        units: item.productInfo.units,
      };
    }
  );

  const totalPrice = calculateTotalPrice(productObj);

  // Calculating Total Qty of Products in KGs
  const totalQty: any[] = productObj?.map(
    (item: { productInfo: productInfoInterface }) => {
      if (item.productInfo.qtyLabel.includes("kg")) {
        const qty = item.productInfo.qtyLabel.split("kg")[0];
        const total = Number(qty);
        return total * item.productInfo.units;
      }
      if (item.productInfo.qtyLabel.includes("g")) {
        const qty = item.productInfo.qtyLabel.split("g")[0];
        const total = qty.length > 1 ? Number(qty) / 1000 : Number(qty);
        return total * item.productInfo.units;
      }
    }
  );

  // Total Sum of products qty
  const quantitySum = totalQty?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const columns = [
    {
      title: (
        <Typography.Text className="order-summary-table-heading">
          Name
        </Typography.Text>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <Typography.Text className="order-summary-table-heading">
          Quantity
        </Typography.Text>
      ),
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: (
        <Typography.Text className="order-summary-table-heading">
          Units
        </Typography.Text>
      ),
      dataIndex: "units",
      key: "units",
    },
    {
      title: (
        <Typography.Text className="order-summary-table-heading">
          Price
        </Typography.Text>
      ),
      dataIndex: "price",
      key: "price",
    },
  ];

  const calculateDeliveryCharge = () => {
    const deliverCharge = 49;
    if (currency === "USD") {
      return quantitySum > 1 ? 0 : deliverCharge;
    } else if (currency === "INR") {
      return quantitySum >= 3 ? 0 : deliverCharge;
    } else return 0;
  };

  const calculatePriceWithDelivery = () => {
    if (currency === "USD")
      return quantitySum > 1 ? totalPrice : totalPrice + 49;
    else if (currency === "INR")
      return quantitySum >= 3 ? totalPrice : totalPrice + 49;
    else return totalPrice;
  };

  // const calculatePriceWithDeliverytoString = () => {
  //   if (currency === "USD") {
  //     const checkoutAmt = quantitySum > 1 ? totalPrice : totalPrice + 45.0;
  //     return checkoutAmt.toString();
  //   } else {
  //     return totalPrice;
  //   }
  // };

  const verifyPayment = (reqBody: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature?: string;
  }) => {
    axios
      .post(baseUrl + "/paymentConfirmation", {
        ...reqBody,
        currency,
        amount: parseFloat(calculatePriceWithDelivery()),
      })
      .then((res) => {
        messageApi.success(res.data.message);
        setTimeout(() => {
          dispatch(removeAllProducts());
          navigate(routes.HOME);
        }, 4000);
      })
      .catch((err) => {
        messageApi.error(err.response.data.message);
      });
  };

  const handleCheckout = async () => {
    const completeAddress = userData.complete_address || {};
    const allValuesFilled = Object.values(userData).every((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return true;
    });

    const allAddressValuesFilled = Object.values(completeAddress).every(
      (value: any) => {
        if (typeof value === "string") {
          return value.trim() !== "";
        }
        return true;
      }
    );

    if (allValuesFilled && allAddressValuesFilled) {
      const totalAmt = parseFloat(calculatePriceWithDelivery());
      // const numberString = str.replace(/[^\d.]/g, '');

      isLoading(true);
      await axios
        .post(baseUrl + "/order", {
          user: userData,
          order: {
            payment_mode: selectedPayment,
            order_detail: productObj,
            total_price: totalAmt,
            tax: 0,
            delievery_charge: calculateDeliveryCharge(),
            status: "cart",
          },
          amount: totalAmt,
          currency,
        })
        .then((res) => {
          const resOrder = res.data.order;
          if (res?.data) isLoading(false);
          if (selectedPayment === PaymentTypes.COD) {
            messageApi.success("Order Placed Successfully");
            setTimeout(() => {
              dispatch(removeAllProducts());
              navigate(routes.HOME);
            }, 3000);
          } else if (selectedPayment === PaymentTypes.PAYNOW) {
            const options = {
              razorpay_key,
              amount: resOrder.amount,
              currency,
              name: "Timp Eats",
              description: "Payment for order",
              image: logo,
              order_id: resOrder.id,
              handler: verifyPayment,
              retry: { enabled: false },
              prefill: {
                name: userData.full_name,
                email: userData.email,
                contact: userData.phone_number,
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#121212",
              },
            };

            const razor = window.Razorpay(options);
            razor.open();
            razor.on("payment.failed", (res: any) => {
              console.log("on err : ", res);
              verifyPayment({
                razorpay_order_id: res.error.metadata.order_id,
                razorpay_payment_id: res.error.metadata.payment_id,
              });
            });
          }
        })
        .catch((err) => {
          console.log("❌ ~ error at create order: ", err)
          messageApi.error("Something went wrong");
          isLoading(false);
        });
    } else {
      messageApi.error("Kindly fill all the details in the form");
    }
  };

  const dataSource = productsData;

  return (
    <Col className="order-summary-main-col glassmorphism-effect">
      <Typography.Text className="heading-md">Order Summary</Typography.Text>
      {contextHolder}
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      {currency === "INR" ? (
        <Flex className="order-summary-flex" justify="space-between">
          <Typography.Text className="order-summary-footer-text">
            Delivery
          </Typography.Text>
          {currencySym === "₹" ? (
            <Typography.Text className="order-summary-footer-text free-del-text">
              {calculateDeliveryCharge() || "FREE"}
            </Typography.Text>
          ) : (
            <Typography.Text className="order-summary-footer-text free-del-text">
              FREE
            </Typography.Text>
          )}
        </Flex>
      ) : null}

      <br />
      {/* {currencySym === "₹" ?? (
        <Typography.Text className="order-summary-footer-text">
          <i>
            Add
            <Typography.Text mark>
              {(3 - quantitySum) * 1000} grams
            </Typography.Text>
            more to remove delivery cost
          </i>
        </Typography.Text>
      )} */}
      <Divider />
      <Flex vertical gap={15}>
        {currencySym === "₹" ?? (
          <Flex
            className={`glassmorphism-effect ${
              selectedPayment === PaymentTypes.COD ? "selected-payment" : ""
            }`}
            style={{ padding: "3%" }}
            align="center"
            onClick={() => setSelectedPayment(PaymentTypes.COD)}
          >
            <Col span={20}>
              <Typography.Title className="footer-title">COD</Typography.Title>
              {selectedPayment === PaymentTypes.COD ? (
                <Typography.Text>
                  <i>It's our first step of believing in each other. </i>
                </Typography.Text>
              ) : null}
            </Col>
            <Col>
              {selectedPayment === PaymentTypes.COD ? (
                <Typography.Text
                  className="order-summary-footer-text"
                  style={{ color: "green" }}
                >
                  {currencySym} {calculatePriceWithDelivery()}
                </Typography.Text>
              ) : null}
            </Col>
          </Flex>
        )}

        <Space direction="vertical">
          {currency === "INR" && (
            <Row
              className={`glassmorphism-effect ${
                selectedPayment === PaymentTypes.COD ? "selected-payment" : ""
              }`}
              align="middle"
              style={{ padding: "3%", cursor: "pointer" }}
              onClick={() => setSelectedPayment(PaymentTypes.COD)}
            >
              <Col span={20}>
                <Typography.Title className="footer-title">
                  COD
                </Typography.Title>
                <Typography.Text>
                  <i>It's our first step of believing in each other. </i>
                </Typography.Text>
              </Col>

              <Col>
                <Typography.Text
                  className="order-summary-footer-text"
                  style={{ color: "green" }}
                >
                  {currencySym}
                  {calculatePriceWithDelivery()}
                </Typography.Text>
              </Col>
            </Row>
          )}
          <Row
            className={`glassmorphism-effect ${
              selectedPayment === PaymentTypes.PAYNOW ? "selected-payment" : ""
            }`}
            align={"middle"}
            style={{ padding: "3%", cursor: "pointer" }}
            onClick={() => setSelectedPayment(PaymentTypes.PAYNOW)}
          >
            <Col span={20}>
              <Typography.Title className="footer-title">
                Pay Now
              </Typography.Title>
              <Typography.Text>
                <i>Looks like you already trust us :) </i>
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text
                className="order-summary-footer-text"
                style={{ color: "green" }}
              >
                {currencySym}
                {calculatePriceWithDelivery()}
              </Typography.Text>
            </Col>
          </Row>
        </Space>
      </Flex>
      <br />

      <Button
        type="primary"
        className="primary-us-btn cart-btn"
        onClick={handleCheckout}
      >
        {selectedPayment === "razorpay" && "Pay & "}
        Checkout
      </Button>
    </Col>
  );
};

export default OrderSummary;
