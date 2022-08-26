import React, { useContext, useState } from 'react'
import axios from 'axios';
import {Card} from "react-bootstrap"
import toast from "react-hot-toast"
import "./CSS/card.css"
import UserContext from '../context/UserContext/UserContext';

function CartCard(props) {
  const [quantity, setQuantity] = useState(props.cart.quantity)
  const { token } = useContext(UserContext)
  const price = props.cart.price / props.cart.quantity

  const incrementQuantity = () => {
    if(quantity<props.productValue.stock){
      setQuantity(prev => prev + 1)
    }
  }
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  const removeFromCart = () => {
    console.log(props.productValue._id)
    axios.delete(`http://localhost:9000/user/cart/delete/${props.cart._id}`, { headers: { "token": token } }).then(result => {
      toast.success("Item Removed From Cart")
      window.location.reload()
    }).catch(err => { toast.error("Item Removal Failed") })
  }

  const updateCart = () => {
    const data = {
      quantity: quantity,
      price: quantity * price
    }
    console.log(props.productValue._id)
    axios.put(`http://localhost:9000/user/cart/update/${props.cart._id}`, JSON.stringify(data), { headers: { 'Content-Type': "application/json", "token": token } }).then(result => {
      toast.success("Cart Updated Successfully")
      window.location.reload()
    }).catch(err => { toast.error("Cart Updation Failed") })
  }

  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:9000/user/products/${props.productValue.productName}.jpg`} />
      <Card.Body>
        <Card.Title className='productName'>{props.productValue.productName}</Card.Title>
        <Card.Text>
          <p className="companyName ">{` by ${props.productValue.companyName}`}</p>
          <p className="priceValue">{` Rs.${props.productValue.price}`}</p>
          <div className='quantity-div'>
            <button className="btn btn-primary" onClick={incrementQuantity}>+</button>
            <p>{quantity}</p>
            <button className="btn btn-primary" onClick={decrementQuantity}>-</button>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <button type="submit" className="btn btn-primary my-1" onClick={removeFromCart}>Remove From Cart</button>
        <button type="submit" className="btn btn-primary my-1" onClick={updateCart}>Update Cart</button>
      </Card.Footer>
    </Card>
    </>
  )
}

export default CartCard
