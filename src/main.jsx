import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router.jsx'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Authentication/provider/AuthProvider.jsx'
import { CartProvider } from './pages/Cart/CartProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <HelmetProvider>
    <CartProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </CartProvider>
    </HelmetProvider>
    </AuthProvider>
 </StrictMode>,
)
