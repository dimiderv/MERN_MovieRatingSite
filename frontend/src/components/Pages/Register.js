import React, { useState,useEffect } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { Form, Button,Row } from "react-bootstrap";
import axios from "../../fetch/api/axios";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icon from "react-bootstrap-icons";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{3,24}$/;
const REGISTER_URL = '/register';
const EMAIL_REGEX = /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,3}$/

export default function Register() {
    // initial state
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus,setPasswordFocus]= useState(false);

    const [username, setUsername] = useState("");
    const [validUserName, setValidUserName] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('');

    const [register, setRegister] = useState(false);

    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");



    useEffect(() => {
        setValidUserName(USER_REGEX.test(username));
    }, [username])
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email]);
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd])


    const handleSubmit = async (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        // set configurations

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, password,username,firstName,lastName }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setRegister(true);
            setUsername('');
            setPassword('');
            setMatchPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }

        }

        // const configuration = {
        //   method: "post",
        //   url: "http://localhost:80/register",
        //   data: {
        //     email,
        //     password,
        //     username
        //   },
        // };

        // // make the API call
        // axios(configuration)
        //   .then((result) => {
        //     setRegister(true);
        //     setUsername('');
        //     setPassword('');
        //     setMatchPwd('');
        //   })
        //   .catch((err) => {
        //     if (!err?.response) {
        //       setErrMsg('No Server Response');
        //     } else if (err.response?.status === 409) {
        //         setErrMsg('Username Taken');
        //     } else {
        //       setErrMsg('Registration Failed')
        //   }
        //   });
    };

    return (
        <Row className="justify-content-md-center">
            <div className="Auth-form-container">

                <p className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p>
                <Form className="Auth-form" onSubmit={(e) => handleSubmit(e)}>
                    {/* email */}
                    <div className="Auth-form-content">
                        <h2 className="Auth-form-logo"><Icon.Film />MOvieDb</h2>
                        <h3 className="Auth-form-title">Register</h3>
                        <div className="text-center">
                            Already registered?{" "}
                            <Link to="/login">Sign In</Link>
                        </div>
                        <Form.Group className="form-group mt-3" controlId="formBasicEmail">
                            <Form.Label>Email address:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes}
                                                 className={validEmail || !email ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                            <p id="uidnote" className={email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Wrong email address<br/>
                            </p>
                        </Form.Group>

                        {/* username */}
                        <Form.Group className="form-group mt-3" controlId="formBasicUsername">
                            <Form.Label>Username:
                                <FontAwesomeIcon icon={faCheck} className={validUserName ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes}
                                                 className={validUserName || !username ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <p id="uidnote" className={username && !validUserName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </Form.Group>
                        {/* password */}
                        <Form.Group className="form-group mt-3" controlId="formBasicPassword">
                            <Form.Label>Password:
                                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                onFocus={()=>setPasswordFocus(true)}
                                onBlur={()=>setPasswordFocus(false)}
                            />

                            <p id="pwdnote" className={ passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                        </Form.Group>
                        <Form.Group className="form-group mt-3" controlId="formBasicRetypePassword">
                            <Form.Label>Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />

                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="matchpassword"
                                value={matchPwd}
                                onChange={(e) => setMatchPwd(e.target.value)}
                                placeholder="Confirm Password"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                        </Form.Group>

                        {/* submit button */}
                        <Button
                            disabled={!validUserName || !validPassword || !validMatch ? true : false}
                            className="d-grid gap-2 mt-3"
                            variant="primary"
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Register
                        </Button>

                        {/* display success message */}
                        {register ? (
                            <p className="text-success">You Are Registered Successfully</p>
                        ) : (
                            <p className="text-danger">You Are Not Registered</p>
                        )}
                    </div>
                </Form>
            </div>
        </Row>
    );
}