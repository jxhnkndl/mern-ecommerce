import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/usersSlice';
import { setCredentials } from '../slices/authSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Init login mutation
  const [login, { isLoading }] = useLoginMutation();

  // Query for user info from state
  const { userInfo } = useSelector((state) => state.auth);

  // Check to see if login?redirect=/shipping is in URL
  // If it is, user is logged in and should be redirected to shipping page
  // If it isn't, user is not logged in and must login to complete the transaction

  // Use the search property from the useLocation() hoook
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  // Set redirect value based on search param values
  const redirect = searchParams.get('redirect') || '/';

  // Redirect the user to either the shipping page or the home page depending on
  // whether they are logged in or not
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Run login mutation and unwrap the contents of the response
      const res = await login({ email, password }).unwrap();

      // Dispatch action to set user credentials into local storage
      dispatch(setCredentials({ ...res }));

      // Navigate to redirect (whatever value that is)
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        {/* EMAIL INPUT */}
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        {/* PASSWORD INPUT */}
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        {/* SUBMIT */}
        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          disabled={isLoading}>
          Sign In
        </Button>
        {/* Loader appears when login mutation is running */}
        {isLoading && <Loader />}
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
