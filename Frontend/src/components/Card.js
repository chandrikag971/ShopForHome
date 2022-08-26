import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import toast from "react-hot-toast"
import "./CSS/card.css"
import UserContext from '../context/UserContext/UserContext';


function Card(props) {
  const { isLogin, username, token } = useContext(UserContext)
  const [quantity, setQunatity] = useState(1)
  const [outOfStock, setOutOfStock] = useState(false)

  useEffect(()=>{
    if(props.productValue.stock==0){
      setOutOfStock(true)
    }
  },[])

  const incrementQuantity = () => {
    if(quantity<props.productValue.stock)
      setQunatity(prev => prev + 1)
  }
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQunatity(prev => prev - 1)
    }
  }
  const addToCart = () => {
    const data = {
      username: username,
      product_name: props.productValue._id,
      quantity: quantity,
      price: quantity * props.productValue.price
    }

    axios.post("http://localhost:9000/user/cart/add-item", JSON.stringify(data), { headers: { 'Content-Type': "application/json", "token": token } }).then(result => {
      toast.success("Added Item To Cart")
    }).catch(err => { toast.error("Failed To Add Item in Cart") })

  }
  const addToWishlist = () => {
    const data = {
      username: username,
      product_name: props.productValue._id,
      price: props.productValue.price
    }

    axios.post("http://localhost:9000/user/wishlist/add-item", JSON.stringify(data), { headers: { 'Content-Type': "application/json", "token": token } }).then(result => {
      toast.success("Item Added To Wishlist")
    }).catch(err => { toast.error("Failed To Add Item To Wishlist") })

  }

  return (
    <div className="card-view card" >
      <img src={`http://localhost:9000/user/products/${props.productValue.productName }.jpg`} className="card-image card-img-top " alt="..."></img>
      <div className="card-body">
        <h5 className="card-title productName" style={{fontFamily:"var(--oswald)"}}>{props.productValue.productName}</h5>
        <p className="card-text companyName " style={{textTransform:"capitalize"}}>{` by ${props.productValue.companyName}`}</p>
        <p className="card-text priceValue" style={{fontSize:"1.3rem"}}>{` Rs.${props.productValue.price}`}</p>
        <p className="card-text tagsLabel" style={{opacity:"0.5"}}>{`Tags: ${props.productValue.tags}`}</p>
        {outOfStock && <p>OUT OF STOCK</p>}
        {isLogin && !outOfStock && <div className='quantity-div'>
          <button className="btn btn-primary" onClick={incrementQuantity}>+</button>
          <p>{quantity}</p>
          <button className="btn btn-primary" onClick={decrementQuantity}>-</button>
        </div>}
        {isLogin && !outOfStock && <button type="submit" className="btn btn-primary" onClick={addToCart}>Add To Cart</button>}
        {isLogin && <button type="submit" className="btn btn-primary" onClick={addToWishlist}>Add To Wishlist</button>}
      </div>
    </div>
  )
}

export default Card
