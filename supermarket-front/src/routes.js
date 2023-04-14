import { createBrowserRouter } from 'react-router-dom';
import { Cart } from "./pages/cart/Cart";
import { Products } from "./pages/products/Products";
import { Stock } from './pages/stock/Stock';

export const routes =
  createBrowserRouter([
    {
      path: '/products',
      element: <Products />,
    },

    {
      path: '/cart',
      element: <Cart />,
    },

    {
      path: '/stock',
      element: <Stock />,
    },

    {
      path: '*',
      element: <Products /> 
    }
  ]);
