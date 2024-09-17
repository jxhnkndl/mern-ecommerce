import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    }

    fetchProducts();
  }, []);
  
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          // Small Screens: Col spans 12 column units
          // Medium Screens: Col spans 6 column units
          // Large Screens: Col spans 4 column units
          // XL Screens: Col spans 2 column units
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
