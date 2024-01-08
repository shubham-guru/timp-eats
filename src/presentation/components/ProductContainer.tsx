import { useState } from "react";
import Flex from "antd/lib/flex";
import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import Select from "antd/lib/select";
import Space from "antd/lib/space";
import Collapse, { CollapseProps } from "antd/lib/collapse";
import { productInfo } from "../../domain/productInfo";
import { productInfoInterface } from "../../domain/interfaces/productInfoInterface";

import "./styles/productContainer.css"

const { Text } = Typography;
const ProductContainer = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0)

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleQty = (type: string) => {
    if(type === "minus"){
        setQuantity(preQty => (preQty > 0 ? preQty - 1 : preQty));
    } else{
        setQuantity(preQty => (preQty >= 0 ? preQty + 1 : preQty));
    }
  }
   
  const handlePrice = () => {
    if(quantity === 250) {
      setPrice(price)
    } else if(quantity === 500) {
      setPrice((price*2) - 20)
    } else if(quantity === 1) {
      setPrice((price*4) - 35)
    }
}
  const productsAction = (name: string, price: number) => {
    return (
      <Flex align="center" justify="space-around">
        <Text className="product-info">{name}</Text>
        <Select
          defaultValue="250"
          onChange={handleChange}
          options={[
            { value: "250", label: "250 g" },
            { value: "500", label: "500 g" },
            { value: "1", label: "1 kg" },
          ]}
        />

        <Space>
          <Space.Compact>
            <Button onClick={() => handleQty("minus")}>-</Button>
            <Button>{quantity}</Button>
            <Button onClick={() => handleQty("add")}>+</Button>
          </Space.Compact>
        </Space>
        <Text className="product-info">₹ {price} /-</Text>
      </Flex>
    );
  };
  console.log(price, "-----------------")



  const items: CollapseProps["items"] = productInfo.map(
    (product: productInfoInterface) => {
      return {
        key: product.id,
        label: productsAction(product.name, product.price),
        children: product.ingredients,
      };
    }
  );

  const onChange = (key: string | string[]) => {
    // console.log(key);
  };

  return (
    <Col span={24} style={{margin: 20}}>
      <span id="ele1"></span>
      <Collapse
        items={items}
        expandIconPosition="right"
        defaultActiveKey={[]}
        onChange={onChange}
        className="collapse-container"
      />
    </Col>
  );
};

export default ProductContainer;
