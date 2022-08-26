import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import CategoriesBar from './components/CategoriesBar';
import Gallery from './components/Gallery';
import CartGallery from './components/CartGallery';
import Stock from './components/Reports/Stock';
import UserCRUD from './components/UserCRUD';
import ProductCRUD from './components/ProductCRUD';
import Reports from './components/Reports';
import WishlistGallery from './components/WishlistGallery';
import CouponCRUD from './components/CouponCRUD';
import Footer from './components/Footer.js'
import OrderConfirmation from './components/Order-Confirmation'
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <CategoriesBar></CategoriesBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          {/* admin */}

          <Route path="/admin/user-crud" element={<UserCRUD></UserCRUD>} />
          <Route
            path="/admin/products-crud"
            element={<ProductCRUD></ProductCRUD>}
          />
          <Route
            path="/admin/coupon-crud"
            element={<CouponCRUD></CouponCRUD>}
          />
          <Route path="/admin/reports" element={<Reports></Reports>} />
          <Route path="/admin/reports/stock" element={<Stock />} />

          {/* users */}
          <Route path="/user/cart" element={<CartGallery />} />
          <Route path="/user/order-confirm" element={<OrderConfirmation />} />
          <Route path="/user/wishlist" element={<WishlistGallery />} />
          {/* <Route exact path='/user' element={<Home />} />
        <Route path='/admin' element={<Home />} /> */}
          <Route path="/category/:categoryValue" element={<Gallery />} />
        </Routes>
        <ToastContainer autoClose={2000} />
        <Toaster toastOptions={{"duration":3000}}/>
      </div>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
