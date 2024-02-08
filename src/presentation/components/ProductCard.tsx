import React from 'react'
import Flex from "antd/lib/flex";
import Image from "antd/lib/image";
import Col from "antd/lib/col";
import List from 'antd/lib/list';
import Button from 'antd/lib/button';
import { ShoppingCartOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import { useSelector, useDispatch } from 'react-redux'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface';
import "./styles/productCard.css"
import { RootState } from '../../redux/store/store';
import { addProduct } from '../../redux/slice/addtoCardSlice';

type IProductCard = {
    productInfo: productInfoInterface
}
const ProductCard: React.FC<IProductCard> = ({productInfo}) => {
  const productObj = useSelector((state: RootState) => state.products)

  console.log(productObj)
  const dispatch = useDispatch()
  
  return (
    <Col className="single-product-card">
      <Flex justify="space-between">
          <Col span={4}>
            <Image src={productInfo.image} alt={`${productInfo.name}-pic`} className="product-img" />
          </Col>

          <Col span={19} className="product-head-col">
            <Col span={20}>
              <Flex justify='space-between'>
                <Typography className="product-primary-text">{productInfo.name}</Typography>
                <Button type='link' className="add-to-cart-btn" onClick={() => dispatch(addProduct(productInfo))} icon={<ShoppingCartOutlined />}>Add to cart</Button>
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
      
    </Col>
  )
}

export default ProductCard