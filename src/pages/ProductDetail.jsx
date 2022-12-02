import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createCartThunk } from "../store/slices/cart.slice";
import { getProductsThunk } from "../store/slices/products.slice";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productList = useSelector((state) => state.products);

  const productsFound = productList.find((item) => item.id === Number(id));
  const relatedProducts = productList.filter(
    (item) => item.category.id === productsFound.category.id &&
    item.id !== productsFound.id
  );

  const [input,setInput]=useState("");

  const addToCart =()=>{
    const productObject = {
      id:productsFound.id,
      quantity:input
  }
   dispatch(createCartThunk(productObject))
   console.log(productObject)
  }



  return (
    <div>
      <Container className="prod-container" style={{marginTop:90 ,marginBottom:120}}>
          <h2>{productsFound?.title}</h2>
          <img style={{ width: 300 }} src={productsFound?.productImgs[0]} alt="" />
          <p>{productsFound?.description}</p>
      </Container>
      <div className="product-quantity">
        <input type= "text"
        value={input}
        onChange={e => setInput(e.target.value)} 
        placeholder="Introduce an amount"/>
        <Button style={{marginLeft:10,borderRadius:30}} onClick={addToCart}>
          Add Cart
        </Button>
      </div>
      <ListGroup className="options-holder" horizontal style={{gap:20}}>
        {relatedProducts.map((product) => (
          <Link key={product.id}
            to={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <ListGroup.Item style={{width:300}}>
              <h5>{product.title}</h5>
              <Card.Img
                src={product?.productImgs[0]}
                style={{ width:200,height: 300, objectFit: "contain" }}
                alt=""
              />
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
      {/*relatedProducts.map((product) => (
        <li key={product.id}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </li>
      ))*/}
    </div>
  );
};

export default ProductDetail;
