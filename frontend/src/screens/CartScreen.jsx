import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Query cart data from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Row>
      {/* Product/Cart Details */}
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {/* Determine what to show based on whether user has items in cart or not */}
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    {/* Link back to product items */}
                    <Link to={`/product/${item._id}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => {}}>
                      {/* Only show as many items as are in stock as potential quantity to add to cart */}
                      {[...Array(item.countInStock).keys()].map(
                        (num) => (
                          // Adding 1 so that the qty doesn't start at 0 where the array values begin
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light">
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {/* Order Summary */}
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0) }) items
              </h2>
              ${ cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) }
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
