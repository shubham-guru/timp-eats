import React, { useEffect, useState } from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Flex, Button, Badge, Image, Affix } from 'antd'
import routes from "../../routes/routes";
import logo from "../../assets/logo.png";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import "./styles/navbar.css"

type INavBar = {
  isCart?: boolean
}
const Navbar: React.FC<INavBar> = ({ isCart = true }) => {
  const productObj = useSelector((state: RootState) => state.cartProducts.productDetails);
  const innerWidth = window.innerWidth;

  const [imageWidth, setImageWidth] = useState<number>(120); // Initial width of the image
  const aspectRatio = 120 / innerWidth; 

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      const newImageWidth = innerWidth * aspectRatio;
      setImageWidth(newImageWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [aspectRatio, innerWidth]);

  
  const navigate = useNavigate();
  return (
    <Affix offsetTop={0}>
    <Flex
      className="head-flex-container glassmorphism-effect"
      align="center"
      justify="space-between">
      <Image preview={false} className="icon-img" src={logo} width={60} onClick={() => navigate(routes.HOME)} />
      <Flex gap={20}>
      {
          isCart ?
            <Badge count={productObj?.length}>
              <Button className="primary-us-btn" onClick={() => navigate(routes.CART)} type="primary" icon={<ShoppingCartOutlined />}>
                Cart
              </Button>
            </Badge> : 
            <Button className="primary-us-btn" onClick={() => navigate(routes.HOME)} type="primary">
                Shop
              </Button>
        }
        <Button className="primary-us-btn" type="primary">
          Contact us
        </Button>
        
      </Flex>
    </Flex>
    </Affix>
  )
}

export default Navbar