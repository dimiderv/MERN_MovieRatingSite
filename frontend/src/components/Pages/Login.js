import React, { useState, useEffect } from "react";
import {  useNavigate, useLocation ,Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Form, Button ,Row} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../features/auth/authSlice";
import {useLoginMutation} from "../../features/auth/authApiSlice";


export default function Login() {
  // initial state
  const { persist,setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/welcome";
  const [errMsg, setErrMsg] = useState('')

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [login, setLogin] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const togglePersist = ()=>{
    setPersist(prev => !prev);
  }
  useEffect(() => {
    setErrMsg('')
  }, [email, password])


  useEffect(()=>{
    localStorage.setItem('persist',persist);
  },[persist]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    try{
      const userData = await login({email, password}).unwrap();
      console.log('Login return data \n',userData)
      dispatch(setCredentials({...userData,username:email}))
      setEmail('')
      setPassword('')
      navigate(from, { replace: true });
    }catch (err){
      console.log(err)
      if (err?.status===404) {
        // isLoading: true until timeout occurs
        setErrMsg(err?.data?.message);
      } else if (err.status === 400) {
        setErrMsg(err?.data?.message);
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };



  return (
    <Row className="justify-content-md-center">
      <div className="Auth-form-container">
        {/* <h2>Login</h2> */}
        <Form className="Auth-form " onSubmit={(e) => handleSubmit(e)}>
          {/* email */}
          <div className="Auth-form-content">
            <h2 className="Auth-form-logo"><Icon.Film/>MovieDb</h2>

            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to="/register">Sign Up</Link>
            </div>
            <Form.Group className="form-group mt-3" controlId="formBasicEmail">
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
            <Form.Group className="form-group mt-3" controlId="formBasicPassword">
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
                className="d-grid gap-2 mt-3"
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
            >
              Login
            </Button>
            <Form.Check type='switch' id="persist" label='Trust this device'
                        onChange={togglePersist}
                        checked={persist}/>
            {/* display success message */}
            {/*{login ? (*/}
            {/*  <p className="text-success">You Are Logged in Successfully</p>*/}
            {/*) : (*/}
              <p className="text-danger" style={{marginTop:".5rem"}}>{errMsg}</p>

          </div>

        </Form>

      </div>
    </Row>
  );
}
