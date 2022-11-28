import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterNameThunk,
  filterProductThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [categoriesList, setCategoriesList] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategoriesList(res.data.data.categories));
  }, []);


  return (
    <div>
      <h1 style={{ marginTop: 40 }}>Choice your favorite product</h1>
      <Row xs={4} md={1} >
        <Container className="my-4">
          {categoriesList.map((category) => (
            <Button
              key={category.id}
              onClick={() => dispatch(filterProductThunk(category.id))}
            >
              {category.name}
            </Button>
          ))}
        </Container>
      </Row>

      <InputGroup size="sm" className="mb-3">
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Button onClick={() => dispatch(filterNameThunk(inputSearch))}>
          Search
        </Button>
      </InputGroup>
      <Row xs={1} md={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card style={{padding:20,height: 400}}>
              <Link to={`/product/${product.id}`}>
                <Card.Img
                  variant="top"
                  src={product.productImgs[0]}
                  style={{ height: 300, objectFit: "contain" }}
                />
              </Link>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ul>
        {/*products.map(product => (
               <Link key={product.id} to={`/product/${product.id}`}>
                 <li >
                  {product.title}
                 </li>
                 <img src={product.productImgs[0]} alt="" />
               </Link>
            ))*/}
      </ul>
    </div>
  );
};

export default Home;
