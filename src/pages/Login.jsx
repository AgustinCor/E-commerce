import axios from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Login = () => {

const {register,handleSubmit}=useForm();

const navigate=useNavigate();

const submit = (data) =>{
    axios.post("https://e-commerce-api.academlo.tech/api/v1/users/login/",data)
      .then(res => {
           navigate("/")
           localStorage.setItem("token",res.data.data.token)
      })
      .catch(error => {
        if (error.response?.status === 404){
            alert("Credenciales incorrectas");
        }else{
            console.log(error.response?.data)
        }
      })
}

  return (
    <Container className="login-container">
      <Form className="login-form" style={{width:700}} onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email (try john@gmail.com to testing)" 
          {...register("email")}/>
          <Form.Text  className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password (try john1234 to testing)" 
          {...register("password")}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
   
  );
};

export default Login;
