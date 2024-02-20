import { useEffect, useState } from "react";
import Flex from "antd/lib/flex";
import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import Space from "antd/lib/space";
import { productInfo } from "../../domain/productInfo";
import { productInfoInterface } from "../../domain/interfaces/productInfoInterface";

import "./styles/productContainer.css"
import ProductCard from "./ProductCard";

const { Text } = Typography;
const ProductContainer = () => {
  const [units, setUnits] = useState<number>(0);
  const [quantity, setQuantity] = useState<string>("250")
  const [price, setPrice] = useState<number>(0)

  const handleChange = (value: string) => {
    setQuantity(value);
  };

  const handleQty = (type: string) => {
    if(type === "minus"){
        setUnits(preQty => (preQty > 0 ? preQty - 1 : preQty));
    } else{
        setUnits(preQty => (preQty >= 0 ? preQty + 1 : preQty));
    }
  }   
  const handlePrice = (price: number) => {
    if(quantity === "250") {
      setPrice(price)
    } else if(quantity === "500") {
      setPrice((price*2) - 20)
    } else if(quantity === "1") {
      setPrice((price*4) - 35)
    }
} 

  return (
    <Col span={24} style={{margin: 20}}>
      {
        productInfo.map((item: any, index: number) => {
          return(
            <ProductCard productInfo={item} key={index}/>
          )
        })
      }
    </Col>
  );
};

export default ProductContainer;
