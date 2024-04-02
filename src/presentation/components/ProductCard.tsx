import React, { useEffect, useState } from 'react';
import { Flex, Image, Col, List, Button, Modal, Select, Divider, message, Row, Collapse, CollapseProps } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import { useSelector, useDispatch } from 'react-redux';
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import { RootState } from '../../redux/store/store';
import { addProduct } from '../../redux/slice/cartSlice';
import { quantities, units } from '../../domain/constants/modalValues';
import HeartIcon from '../../hocs/HeartIcon';

import "./styles/productCard.css"
import { timeZones } from '../../domain/constants/timeZones';

type IProductCard = {
  productInfo: productInfoInterface
}
const ProductCard: React.FC<IProductCard> = ({ productInfo }) => {
  const defaultQty = 250;

  const productObj = useSelector((state: RootState) => state.cartProducts)
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(defaultQty);
  const [qtyLabel, setQtyLabel] = useState<string>(`${defaultQty}g`);
  const [price, setPrice] = useState<number>(0)
  const [unit, setUnit] = useState<number>(1);

  const dispatch = useDispatch()

  const timeZone = localStorage.getItem("timeZone");
  const currencySym = localStorage.getItem("currencySym")

  useEffect(() => {
    if(timeZone === timeZones.INDIA){
      setPrice(productInfo.price[0]);
    } else if(timeZone?.includes(timeZones.UK)) {
      setPrice(productInfo.price[1])
    } else if(timeZone?.includes(timeZones.USA)) {
      setPrice(productInfo.price[2])
    }
  }, [price])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addToCart = (productInfo: productInfoInterface) => {
    const productData = {
      name: productInfo.name,
      id: productInfo.id,
      image: productInfo.img,
      quantity: qtyLabel.includes("kg") ? quantity / 1000 : quantity,
      qtyLabel: qtyLabel,
      units: unit,
      totalPrice: ((price / 250) * quantity) * unit
    }
    dispatch(addProduct(productData))
    if (productObj) {
      messageApi.success("Product has been addded to the cart")
      handleCancel();
    }
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <Typography.Text className="text-md">Health Benefits</Typography.Text>,
      children: <List
        dataSource={productInfo.healthBenefits}
        renderItem={(item) => (
          <List.Item className="secondary text-sm">
            {item}
          </List.Item>
        )}
      />
    }
  ];

  return (
    <Row className="single-product-card glassmorphism-effect" justify="space-between" gutter={[0, 30]}>
      {contextHolder}
      <Col xs={24} md={7} lg={5}>
        <Row gutter={[0, 15]}>
          <Col span={24}>
            <Image src={productInfo.img} alt={`${productInfo.name}-pic`} className="product-img" />
          </Col>
          <Col span={24}>
            <Button size='large' onClick={showModal} icon={<ShoppingCartOutlined />} className='add-to-cart-btn'>Add to cart</Button>
          </Col>
        </Row>
      </Col>

      <Col xs={24} md={16} lg={18}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Row justify="space-between">
              <Col>
                <Typography className="heading-lg">{productInfo.name}</Typography>
              </Col>
              <Col>
                <Typography className="text-md"> {currencySym} {price} / {defaultQty}g</Typography>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Typography.Text className="text-md">Ingredients : <Typography.Text className="secondary text-sm">{productInfo.ingredients} & <HeartIcon /> </Typography.Text>
            </Typography.Text>
          </Col>

          <Col span={24}>
            <Typography.Text className="text-md">Usage : <Typography.Text className="secondary text-sm">{productInfo.usage}</Typography.Text>
            </Typography.Text>
          </Col>

          <Col span={24}>
            <Collapse items={items} bordered={false} />
          </Col>
        </Row>
      </Col>


      {/* Cart Modal */}
      <Modal centered footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Typography className="modal-heading">Add to Cart</Typography>
        <Divider />
        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Select Quantity: </Typography.Text>
          <Select
            defaultValue={String(defaultQty)}
            style={{ width: 120 }}
            onChange={(value: string, options: any) => {
              setQtyLabel(options.label)
              setQuantity(Number(value))
            }
            }
            options={quantities}
          />
        </Flex>

        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Select Unit: </Typography.Text>
          <Select
            defaultValue="1"
            style={{ width: 120 }}
            onChange={(value: string) => setUnit(Number(value))}
            options={units}
          />
        </Flex>

        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Per gram cost: </Typography.Text>
          <Typography.Text>{currencySym} {price / defaultQty}</Typography.Text>
        </Flex>
        <Divider />
        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Total: </Typography.Text>
          <Typography.Text>{currencySym} {((price / defaultQty) * quantity) * unit}</Typography.Text>
        </Flex>

        <Button className="primary-us-btn cart-btn" onClick={() => addToCart(productInfo)} style={{ width: "100%", backgroundColor: "#457b57d8" }} type="primary">Add</Button>
      </Modal>

    </Row>
  )
}

export default ProductCard