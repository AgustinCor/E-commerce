import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';


const Purchases = () => {

  const dispatch=useDispatch();

  const purchases=useSelector(state => state.purchases);

  useEffect(() =>{
    dispatch(getPurchasesThunk())
  },[])


    return (
      <div>
          <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Product</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase) =>
           purchase.cart.products.map((product) => (
            <tr key={product.id}>
              <td >{product.title}</td>
              <td>{product.productsInCart.quantity}</td>
              <Link style={{textDecoration:"none"}} to={`/product/${product.id}`} key={product.id}>
                <td>{product.price}</td>
              </Link>
            </tr>
            ))
          )}
      </tbody>
    </Table>
       {/* <h2>Purchases</h2>
        <ul>
          {purchases.map((purchase) =>
            purchase.cart.products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <li>
                <p>{product.title}</p>
                <h3>{product.productsInCart.quantity}</h3>
                <b>{product.price}</b>
              </li>
            </Link>
            ))
          )}
        </ul>
            */}
      </div>
    );
};

export default Purchases;