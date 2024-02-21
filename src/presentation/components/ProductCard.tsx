import React, { useState } from 'react'
import { Flex, Image, Col, List, Button, Modal, Select, Divider, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import { useSelector, useDispatch } from 'react-redux'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import { RootState } from '../../redux/store/store';
import { addProduct } from '../../redux/slice/cartSlice';
import { quantities, units } from '../../domain/constants/modalValues';
import "./styles/productCard.css"

type IProductCard = {
  productInfo: productInfoInterface
}
const ProductCard: React.FC<IProductCard> = ({ productInfo }) => {
  const productObj = useSelector((state: RootState) => state.cartProducts)

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(250);
  const [qtyLabel, setQtyLabel] = useState<string>("250g");
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
        image: productInfo.img,
        quantity: qtyLabel.includes("kg") ? quantity/1000 : quantity,
        qtyLabel: qtyLabel,
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
    <Col className="single-product-card" span={24}>
      {contextHolder}
      <Flex justify="space-between">
        <Col span={4}>
          <Image src={productInfo.img} alt={`${productInfo.name}-pic`} className="product-img" />
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
            onChange={(value: string, options: any) => {
              setQtyLabel(options.label)
              setQuantity(Number(value))}
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
          <Typography.Text>&#8377; {productInfo.price / 250}</Typography.Text>
        </Flex>
        <Divider />
        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Total: </Typography.Text>
          <Typography.Text>&#8377; {((productInfo.price / 250) * quantity) * unit}</Typography.Text>
        </Flex>

        <Button className="primary-us-btn" onClick={() => addToCart(productInfo)} style={{ width: "100%", backgroundColor: "#457b57d8" }} type="primary">Add</Button>
      </Modal>

    </Col>
  )
}

export default ProductCard