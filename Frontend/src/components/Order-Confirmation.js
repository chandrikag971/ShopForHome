import React from 'react'
import { NavLink } from 'react-router-dom';

function OrderConfirmation() {
  return (
    <div >
      <h1 style={{fontFamily:"var(--playfair)"}}>Order Placed</h1>
      <h3>Thank You For Choosing Us</h3>
      <NavLink to="/" className="btn btn-primary">Visit Homepage</NavLink>
    </div>
  )
}

export default OrderConfirmation
