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
import "./styles/productCard.css"
import { units } from '../../domain/constants/modalValues';

type IProductCard = {
    productInfo: productInfoInterface
}
const ProductCard: React.FC<IProductCard> = ({productInfo}) => {
  const productObj = useSelector((state: RootState) => state.products)
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // console.log(productObj)
  const dispatch = useDispatch()

  const addToCart = (productInfo: productInfoInterface) => {
    showModal();
    dispatch(addProduct(productInfo))
    if(productObj) {
      messageApi.success("Product has been addded to the cart")
    }
    // productObj.map((item: productInfoInterface) => {
    //     console.log("🚀 ~ productObj.map ~ item:", item)
    //     if(item){
          
    //     }
    // })
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
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
                <Button type='link' className="add-to-cart-btn" onClick={() => addToCart(productInfo)} icon={<ShoppingCartOutlined />}>Add to cart</Button>
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
              <Typography className="product-price-text">&#8377; {productInfo.price} <span style={{fontSize: "1.2vmax"}}>/250g</span> </Typography>
            </Flex>

          </Col>
      </Flex>
      


      {/* Modal to cart */}

      <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Typography className="modal-heading">Add to Cart</Typography>
        <Divider />
        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Select Quantity: </Typography.Text>
            <Select
              defaultValue="250"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: '250', label: '250g' },
                { value: '500', label: '500g' },
                { value: '1', label: '1kg' },
              ]}
            />
        </Flex>

        <Flex className="modal-flex" align="center" justify="space-between">
          <Typography.Text>Select Unit: </Typography.Text>
            <Select
              defaultValue="1"
              style={{ width: 120 }}
              onChange={handleChange}
              options={units}
            />
        </Flex>
      </Modal>

    </Col>
  )
}

export default ProductCard