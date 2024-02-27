import React, { useState } from 'react'
import { Flex, Image, Col, List, Button, Modal, Select, Divider, message, Row, Collapse, CollapseProps } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import { useSelector, useDispatch } from 'react-redux'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import { RootState } from '../../redux/store/store';
import { addProduct } from '../../redux/slice/cartSlice';
import { quantities, units } from '../../domain/constants/modalValues';
import "./styles/productCard.css"
import HeartIcon from '../../hocs/HeartIcon';

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
      quantity: qtyLabel.includes("kg") ? quantity / 1000 : quantity,
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

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <Typography.Text className="product-secondary-text">Health Benefits</Typography.Text>,
      children: <List
        dataSource={productInfo.healthBenefits}
        renderItem={(item) => (
          <List.Item className="product-tertiary-text">
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
            <Typography className="product-primary-text">{productInfo.name}</Typography>
          </Col>

          <Col span={24}>
            <Typography.Text className="product-secondary-text">Ingredients : <Typography.Text className="product-tertiary-text">{productInfo.ingredients} & <HeartIcon /> </Typography.Text>
            </Typography.Text>
          </Col>

          <Col span={24}>
            <Typography.Text className="product-secondary-text">Usage : <Typography.Text className="product-tertiary-text">{productInfo.usage}</Typography.Text>
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
            defaultValue="250"
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
          <Typography.Text>&#8377; {productInfo.price / 250}</Typography.Text>
        </Flex>
        <Divider />
        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Total: </Typography.Text>
          <Typography.Text>&#8377; {((productInfo.price / 250) * quantity) * unit}</Typography.Text>
        </Flex>

        <Button className="primary-us-btn cart-btn" onClick={() => addToCart(productInfo)} style={{ width: "100%", backgroundColor: "#457b57d8" }} type="primary">Add</Button>
      </Modal>

    </Row>
  )
}

export default ProductCard