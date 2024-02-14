import React from 'react'
import { Typography, Col } from "antd";
import noData from "../../assets/noData.jpg"

const NoPageFound = () => {

    const styles = {
        container: {
          backgroundImage: `url(${noData})`,
          backgroundRepeat: "no-repeat",
          height: '80vh',
          backgroundPosition: 'center',
          backgroundSize: '70% 100%'
        }
    }
  return (
    <Col>
        <Col style={styles.container}></Col>
        <Typography style={{fontFamily: 'EB Garamond, serif'}}>The page you are looking for is not found !</Typography>
    </Col>
  )
}

export default NoPageFound