import {
  createBrowserRouter,
  Navigate,
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
import Reservation from "../Dashboard/Reservation";
import ReviewForm from "../Dashboard/ReviewForm";
import MyBookings from "../Dashboard/MyBookings";
import AdminHome from "../Admin/AdminHome";
import AddItem from "../Admin/AddItem";
import ManageItems from "../Admin/ManageItems";
import ManageBookings from "../Admin/ManageBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'menu',
        element: <Menu />
      },
      {
        path: 'shop',
        element: <OurShop />
      },
      {
        path: 'contact',
        element: <ContactUs />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'cart',
        element: <PrivateRoute><Cart /></PrivateRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/user-home" replace />
      },
      {
        path: 'user-home',
        element: <UserHome />
      },
      {
        path: 'all-users',
        element: <AllUsers />
      },
      {
        path: 'reservation',
        element: <Reservation />
      },
      {
        path: 'add-review',
        element: <ReviewForm />
      },
      {
        path: 'my-booking',
        element: <MyBookings />
      },
      {
        path: 'admin-home',
        element: <AdminHome />
      },
      {
        path: 'add-items',
        element: <AddItem />
      },
      {
        path: 'manage-items',
        element: <ManageItems />
      },
      {
        path: 'manage-bookings',
        element: <ManageBookings />
      },
      // These dashboard routes seem redundant as they duplicate main routes
      // Consider removing them unless you specifically need dashboard versions
      {
        path: 'home',
        element: <Navigate to="/" replace />
      },
      {
        path: 'menu',
        element: <Navigate to="/menu" replace />
      },
      {
        path: 'shop',
        element: <Navigate to="/shop" replace />
      },
      {
        path: 'contact',
        element: <Navigate to="/contact" replace />
      },
      {
        path: 'my-cart',
        element: <Navigate to="/cart" replace />
      }
    ]
  },
  // Add a catch-all route for 404 pages
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

export default router;