import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home";
import Menu from "../pages/menu/Menu";
import OurShop from "../pages/Shop/OurShop";
import ContactUs from "../pages/Contact/ContactUs";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Cart from "../pages/Cart/Cart";
import Dashboard from "../Layouts/Dashbord";
import AllUsers from "../Dashboard/AllUsers";
import UserHome from "../Dashboard/UserHome";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[{
        path:'/',
        element:<Home></Home>
      },
    {
      path:'/menu',
      element:<Menu></Menu>
    },{
      path:'/shop',
      element:<OurShop></OurShop>
    },{
      path:'/contact',
      element:<ContactUs></ContactUs>
    },{
      path:'/login',
      element:<Login></Login>
    },{
      path:'/register',
      element:<Register></Register>
    },{
      path:'/cart',
      element: <PrivateRoute> <Cart></Cart> </PrivateRoute>
    }]
    },
    {
      path:'/Dashbord',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[{
        path:'dashboard/home',
        element:<Home></Home>

      },{
        path:'dashboard/menu',
        element:<Menu></Menu>
      },
    {
      path:'dashboard/shop',
      element:<OurShop></OurShop>,
    },
    {
      path:'dashboard/contact',
      element:<ContactUs></ContactUs>,
    },
  {
    path:'dashboard/my-cart',
    element:<Cart></Cart>
  },{
    path:'dashboard/all-users',
    element:<AllUsers></AllUsers>
  },{
    path:'dashboard/user-home',
    element:<UserHome></UserHome>
  }]
    }
  ]);
  export default router;