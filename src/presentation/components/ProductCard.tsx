import React, { useState } from 'react'
import Flex from "antd/lib/flex";
import Image from "antd/lib/image";
import Col from "antd/lib/col";
import List from 'antd/lib/list';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import Divider from 'antd/lib/divider';
import { ShoppingCartOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import { useSelector, useDispatch } from 'react-redux'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import { RootState } from '../../redux/store/store';
import { addProduct } from '../../redux/slice/addtoCardSlice';
import { quantities, units } from '../../domain/constants/modalValues';
import "./styles/productCard.css"

type IProductCard = {
  productInfo: productInfoInterface
}
const ProductCard: React.FC<IProductCard> = ({ productInfo }) => {
  const productObj = useSelector((state: RootState) => state.products)

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(250);
  const [unit, setUnit] = useState<number>(1);

  const dispatch = useDispatch()

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
        image: productInfo.image,
        quantity: quantity,
        units: unit,
        totalPrice: ((productInfo.price / 250) * quantity) * unit
    }
    dispatch(addProduct(productData))
    if (productObj) {
      messageApi.success("Product has been addded to the cart")
      handleCancel();
    }
  }

  return (
    <Col className="single-product-card">
      {contextHolder}
      <Flex justify="space-between">
        <Col span={4}>
          <Image src={productInfo.image} alt={`${productInfo.name}-pic`} className="product-img" />
        </Col>

        <Col span={19} className="product-head-col">
          <Col span={20}>
            <Flex justify='space-between'>
              <Typography className="product-primary-text">{productInfo.name}</Typography>
              <Button type='link' className="add-to-cart-btn" onClick={showModal} icon={<ShoppingCartOutlined />}>Add to cart</Button>
            </Flex>
            <Typography.Text className="product-secondary-text" type='secondary' italic>Ingredients : <Typography.Text>{productInfo.ingredients}</Typography.Text>
            </Typography.Text> <br /> <br />
            <Typography.Text className="product-secondary-text" type='secondary' italic>Usage : <Typography.Text mark>{productInfo.usage}</Typography.Text>
            </Typography.Text> <br /> <br />
            <Typography.Text className="product-secondary-text" type='secondary' italic>Health Benefits :
              <List
                dataSource={productInfo.healthBenefits}
                renderItem={(item) => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              /> </Typography.Text>
          </Col>

          <Flex>
            <Typography className="product-price-text">&#8377; {productInfo.price} <span style={{ fontSize: "1.2vmax" }}>/250g</span> </Typography>
          </Flex>

        </Col>
      </Flex>



      {/* Cart Modal */}

      <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Typography className="modal-heading">Add to Cart</Typography>
        <Divider />
        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Select Quantity: </Typography.Text>
          <Select
            defaultValue="250"
            style={{ width: 120 }}
            onChange={(value: string) => setQuantity(Number(value))}
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
          <Typography.Text>&#8377; {productInfo.price / 250}</Typography.Text>
        </Flex>
        <Divider />
        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Total: </Typography.Text>
          <Typography.Text>&#8377; {((productInfo.price / 250) * quantity) * unit}</Typography.Text>
        </Flex>

        <Button className="primary-us-btn cart-btn" onClick={() => addToCart(productInfo)} style={{ width: "100%" }} type="primary">Add</Button>
      </Modal>

    </Col>
  )
}

export default ProductCard