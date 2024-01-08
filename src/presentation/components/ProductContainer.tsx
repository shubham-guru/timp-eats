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

const { Text } = Typography;
const ProductContainer = () => {
  const [quantity, setQuantity] = useState<number>(0);

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

  const productsAction = (name: string) => {
    return (
      <Flex align="center" justify="space-around">
        <Text>{name}</Text>
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
      </Flex>
    );
  };

  const items: CollapseProps["items"] = productInfo.map(
    (product: productInfoInterface, index: number) => {
      return {
        key: product.id,
        label: productsAction(product.name),
        children: product.ingredients,
      };
    }
  );

  console.log(items);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Col span={24}>
      <Collapse
        items={items}
        expandIconPosition="right"
        defaultActiveKey={[]}
        onChange={onChange}
      />
    </Col>
  );
};

export default ProductContainer;
