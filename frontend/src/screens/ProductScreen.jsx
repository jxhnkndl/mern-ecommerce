import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsSlice';
import { addToCart } from '../slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  // Capture product's id from URL params
  const { id: productId } = useParams();

  // Init navigation object
  const navigate = useNavigate();

  // Init dispatch method
  const dispatch = useDispatch();

  // Fetch product details from API through Redux's API slice using the product's ID in the endpoint
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // Dispatch the product pulled in from the API along with the chosen quantity
  // Navigate to cart after adding product to cart
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {/* Image Column */}
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          {/* Product Details Column */}
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.rating} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          {/* Price + Purchase Column */}
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}>
                          {/* Create a array with the same number of elements as there are items in stock */}
                          {/* EX: If there are 10 items in stock, the array will have a .length of 10 */}
                          {/* .keys() creates an array of indexes (starting at 0) */}
                          {[...Array(product.countInStock).keys()].map(
                            (num) => (
                              // Adding 1 so that the qty doesn't start at 0 where the array values begin
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  {/* Render button disabled if product is not in stock */}
                  <Button
                    className='btn-block'
                    type='button'
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
