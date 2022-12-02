import React, { useEffect } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCartThunk, getCartThunk } from "../store/slices/cart.slice";

const Cart = ({show,handleClose}) => {

  const dispatch=useDispatch()

  useEffect(()=>{
   dispatch(getCartThunk())
  },[]);

  const cart = useSelector(state => state.cart)



  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <ListGroup>
            {
                cart.map(product=>(
                <ListGroup.Item  key={product.id}>
                   <h6 className="product-name-cart">{product.title}</h6>
                   <div className="total-price">
                     <b>Total:</b>
                     <b><i className="fa-solid fa-dollar-sign"></i>{product.price}</b>
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
