import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios"
import UserContext from '../context/UserContext/UserContext';
import CartCard from './Cartcard';
import "./CSS/gallery.css"

function CartGallery() {
    const { token } = useContext(UserContext)
    const [productData, setProductData] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [effectivePrice, setEffectivePrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)

    const [couponData, setCouponData] = useState({})
    const [availableCoupons,setAvailableCoupons] = useState()
    const [showModal, setShowModal] = useState(false);
    let today = new Date()
    let totalItems = cartList?.length

    const calcDiscountedPrice = (total) => {
        if(couponData.value)
            if(couponData.type==='amount')
                return total - (couponData.value / totalItems)
            else
                return total - (total * (couponData.value / 100))
        else
            return total
    }

    useEffect(() => {
        const func = () => {
            const user = JSON.parse(localStorage.getItem("userData")).data
            fetch(`http://localhost:9000/user/cart/username/${user.username}`, { headers: { "token": user.token } }).then(res => res.json()).then(async (result) => {
                setCartList(result)
                let finalPrice = 0
                const array = await Promise.all(result.map(async (item) => {
                    const response = await fetch(`http://localhost:9000/user/products/id/${item.product_name}`)
                    const data = await response.json();
                    finalPrice = finalPrice + item.price
                    return data;
                }))
                setProductData(array);
                setTotalPrice(finalPrice)
                setEffectivePrice(finalPrice)
            })
        }
        func()
    }, [])


    const applyCouponCode = (coupon) => {
        setCouponData(coupon)
        toast.success("Check The Discounted Price")
        if (coupon.type === "amount") {
            console.log("amount");
            setDiscountPrice(coupon.value);
            setEffectivePrice(totalPrice - coupon.value);
        } else {
            console.log("percent");
            setDiscountPrice((totalPrice * coupon.value) / 100);
            setEffectivePrice(totalPrice - (totalPrice * coupon.value) / 100);
        }
    }

    const saveCoupon = () => {
        setShowModal(false);
    }

    const removeCoupon = () => {
        setDiscountPrice(0);
        setEffectivePrice(totalPrice);
        setCouponData({})
        toast.error("Removed Coupon")
    }

    const checkValidCoupons = (coupon) => {
        if(new Date(coupon.expiryDate) > today) {
            if(totalPrice >= coupon.eligibility) {
                return true;
            }
        }
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
        removeCoupon()
    };

    const getCoupons = () => {
        fetch("http://localhost:9000/user/coupons/read-all", {
            headers: { token: token },
        })
        .then(res => res.json())
        .then(result => {
            let data = result.message
            data = data.filter(checkValidCoupons);
            setAvailableCoupons(()=>{return data})
            handleShowModal()
        })
        .catch(err=>{
            toast.error("Error! While Retreiving Coupons")
        })
    }


    const buyNowBackendCalls = (item,data) => {
        fetch(`http://localhost:9000/admin/products/update/${item.product_name}`, { method: "PUT", headers: { 'Content-Type': 'application/json', "token": token }, body: JSON.stringify(data) }).then(res => res.json()).then(result => {
                console.log(result)
            }).catch(err=>{
                toast.error("Internal Server Error")
            })

        axios.delete(`http://localhost:9000/user/cart/delete/${item._id}`, { headers: { "token": token } }).then(result => {
            window.location.reload()
        }).catch(err => { console.log(err.data) })
    }

    const buyNow = () => {
        cartList.map((item, index) => {
            // Calculating Total cost for each item in Cart and Updating Product Revenue
            let totalCost = item.quantity * item.price
            totalCost = calcDiscountedPrice(totalCost)

            let data = {
              sold: productData[index].sold + item.quantity,
              stock: productData[index].stock - item.quantity,
              quantity: item.quantity,
              purchasePrice: totalCost,
              mail: (productData[index].stock - item.quantity < 10)?"Mailed":"Available"
            };

            let emailParams = {
              subject: "Low Stock for " + productData[index].productName,
              message: "Stocks for " + productData[index].productName+
                       " are below 10 Units \n We need to Refill Immediately!!"
            };

            if(data.mail === "Mailed"){
                emailjs
                  .send(
                    "service_6jlz1na",
                    "template_6uyjzp4",
                    emailParams,
                    "UtDjRIc9esp9u0Hc1"
                  )
                  .then(
                    function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                      buyNowBackendCalls(item,data)
                    },
                    function (error) {
                      console.log("FAILED...", error);
                    }
                  );
            } else {
                buyNowBackendCalls(item, data);
            }
        })
    }

    return (

        // <div className="row row-cols-1 row-cols-md-3 g-4 my-3 appWrapper galleryView">
        <div className='payment-card-container' >

            <div className='appWrapper galleryView'>
                {productData.map((product, index) => {
                    product.price = cartList[index].price
                    return (
                        <CartCard key = {product.productName} productValue={product} cart={cartList[index]}></CartCard>
                    )
                })}
            </div>

            <div className='payment-view my-4'>
                <Modal show={showModal} onHide={handleHideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Available Coupons</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-around'>
                            <h4>Coupon Code</h4>
                            <h4>Discount</h4>
                        </div>
                        {
                            availableCoupons?.map((coupon) => {
                                return (
                                  <div className="d-flex justify-content-around" key={coupon.code}>
                                    <b><p className="couponCode" onClick={()=>{applyCouponCode(coupon)}}>{coupon.code}</p></b>
                                    <b>{coupon.type==="amount"?(<p>₹{coupon.value}/-</p>):(<p>{coupon.value}%</p>)}</b>
                                  </div>
                                );
                            })
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleHideModal}>
                            Close
                        </Button>
                        <Button onClick={saveCoupon}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className='coupon-card'>
                    <Button onClick={getCoupons} style={{width:"95%",fontWeight:"bold"}}>
                        Get Coupons
                    </Button>
                </div>

                <div className="price-card">
                    <h5>Total Amount</h5>
                    <h6>₹{totalPrice}\-</h6>
                    <h5>Discount</h5>
                    <h6>₹{discountPrice}\-</h6>
                    <h5>Coupon Code</h5>
                    <h6><b>{couponData.code}</b></h6>
                    <hr/>
                    <h5>Payable Amount</h5>
                    <h6>₹{effectivePrice}\-</h6>
                    <NavLink to="/user/order-confirm" className='btn btn-primary' onClick={buyNow}>Place Order</NavLink>
                </div>
            </div>
            
        </div>
    )
}

export default CartGallery
