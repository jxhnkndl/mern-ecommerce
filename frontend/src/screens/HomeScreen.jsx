import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  // Fetch data from API and extract key data and state properties from response
  // Function and endpoint are defined in the productsSlice.js script
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
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
      )}

      
    </>
  );
};

export default HomeScreen;
