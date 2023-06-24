import React, { useState, useEffect } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Form, Button } from "react-bootstrap";
import axios from '../api/axios';



export default function Login() {
  // initial state
  const { setAuth,persist,setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);


  const togglePersist = ()=>{
    setPersist(prev => !prev);
  }

  useEffect(()=>{
    localStorage.setItem('persist',persist);
  },[persist]);
  
  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations

    try {
      const response = await axios.post(
        "http://localhost:80/login",
          JSON.stringify({ email, password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const token = response?.data?.token;
      //console.log(email,token)
      
    setAuth({email,token});
      // cookies.set("TOKEN",token, {
      //   path: "/",
      // });
      setEmail('');
      setPassword('');
      setLogin(true);
      navigate(from, { replace: true });
  } catch (error) {
    console.log(error.message)
  }

  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
        <Form.Check type='switch' id="persist" label='Trust this device'
        onChange={togglePersist}
        checked={persist} />
        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
    </>
  );
}
