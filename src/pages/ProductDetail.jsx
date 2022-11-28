import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productList = useSelector((state) => state.products);

  const products = productList.find((item) => item.id === Number(id));
  const relatedProducts = productList.filter(
    (item) => item.category.id === products.category.id &&
    item.id !== products.id
  );

  return (
    <div>
      <Container className="prod-container" style={{marginTop:90 ,marginBottom:120}}>
          <h2>{products?.title}</h2>
          <img style={{ width: 300 }} src={products?.productImgs[0]} alt="" />
          <p>{products?.description}</p>
      </Container>
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
