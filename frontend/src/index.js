import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PaymentScreen from './screens/PaymentScreen';
import PrivateRoute from './components/PrivateRoute';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import reportWebVitals from './reportWebVitals';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

// This is the master router component that gets rendered when user visits /
// Interior routes get rendered inside the <Outlet /> component in <App />
// The true index ensures that ONLY the home screen shows up at the / route
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />

      {/* PRIVATE ROUTES: Only authenticate users can view shipping screen */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Render the RouterProvider since that's the structure rendering <App /> and its screens */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
