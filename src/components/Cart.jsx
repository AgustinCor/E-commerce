import React, { useEffect, useState } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCartThunk, deleteCartThunk, getCartThunk } from "../store/slices/cart.slice";

const Cart = ({show,handleClose}) => {

  const dispatch=useDispatch()

  useEffect(()=>{
   dispatch(getCartThunk())
  },[]);


  const cart = useSelector(state => state.cart)

  const [totalPrice,setTotalPrice]=useState(0)

  useEffect(()=>{
     let total=0;
      cart.forEach(product=>{
        total+=product.price * product.productsInCart.quantity
      })
      setTotalPrice(total)
  },[cart])



  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="cart-title">
          <h4>Cart</h4> 
          <h5>Total amount:
            <span className="span-price">
              <i className="fa-solid fa-dollar-sign"></i>
              {totalPrice}
            </span></h5>
          </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <ListGroup>
            {
                cart.map(product=>(
                <ListGroup.Item  key={product.id}>
                   <h6 className="product-name-cart">{product.title}</h6>
                   <div className="total-price">
                     <b>Quantity:</b>
                     <b>{product.productsInCart.quantity}</b>
                   </div>
                   <div className="total-price">
                     <b>Total:</b>
                     <b><i className="fa-solid fa-dollar-sign"></i>{product.price}</b>
                   </div>
                   <div>
                    <Button style={{borderRadius:30,margin:10,background:"#a00"}} onClick={() => dispatch(deleteCartThunk(product.id))}>Delete</Button>
                   </div>
                  </ListGroup.Item>
                ))
            }
       </ListGroup>
        <Button className="check-button" onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
