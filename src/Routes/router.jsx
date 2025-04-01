import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home";
import Menu from "../pages/menu/Menu";
import OurShop from "../pages/Shop/OurShop";
import ContactUs from "../pages/Contact/ContactUs";
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
    }]
    },
  ]);
  export default router;