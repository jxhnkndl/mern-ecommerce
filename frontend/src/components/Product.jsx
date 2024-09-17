import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    // Links navigate to this specific product's details
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
