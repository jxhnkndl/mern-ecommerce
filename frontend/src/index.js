import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import reportWebVitals from './reportWebVitals';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

// Create routes
const router = createBrowserRouter(createRoutesFromElements(
  // This is the master component that gets render when user visits /
  // Interior routes get rendered inside the <Outlet /> component in <App />
  // The true index ensures that ONLY the home screen shows up at the / route
  <Route path="/" element={<App />}>
    <Route index={true} path="/" element={<HomeScreen />} />
    <Route path="/product/:id" element={<ProductScreen />} />
  </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Render the RouterProvider since that's the structure rendering <App /> and its screens */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
