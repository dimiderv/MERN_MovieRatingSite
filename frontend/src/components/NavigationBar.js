import * as Icon from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const jwt = require("jsonwebtoken");


// const logout = () => {
//     // destroy the cookie
  
//     cookies.remove("TOKEN", { path: "/" });
//     // redirect user to the landing page
//     window.location.href = "/login";
//   };




const NavigationBar = ()=>{
  const navigate = useNavigate();
  const {auth} = useAuth();
  const logout=useLogout();
  const signOut = async () => {
      // if used in more components, this should be in context 
      // axios to /logout endpoint 
      await logout();
      navigate('/linkpage');
  }

const confirmAction = () => {
    const response = window.confirm("Are you sure you want to do that?");
  
    if (response) {
      signOut();
      alert("Ok was pressed");
    } else {
      alert("Cancel was pressed");
    }
  };
  let decodedToken='';
  if(auth.token){
    decodedToken = jwt.verify(auth.token,"RANDOM-TOKEN");
  }
  
    return (
        <Row xs={12} sm={12} md={12} lg={12}>
        <Container fluid>
          <Row xs={12} sm={12} md={12} lg={12}>
            <Col xs={12}>
              <Navbar bg="light" expand="sm">
                <Icon.Film />
                <Navbar.Brand as={Link} to="/">MOvieDb</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {!auth && <Nav.Link as={Link} to="register">Register</Nav.Link>}
                    {!auth && <Nav.Link as={Link} to="genre">Genre</Nav.Link>}
                    {!auth && <Nav.Link as={Link} to="addmovies">Add Movies</Nav.Link>}
                    <Nav.Link as={Link} to="auth">Movies</Nav.Link>
                    <Nav.Link as={Link} to="upcoming">Upcoming</Nav.Link>


                  </Nav>

                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>

                  <Col>
                    <Nav className="justify-content-end">
                      <NavDropdown
                        title={<Icon.PersonCircle />}
                        id="navbarScrollingDropdown"
                      >
                        <NavDropdown.Item disabled href="#">
                          {decodedToken.userName}
                        </NavDropdown.Item>
                     { !auth &&  <NavDropdown.Item as={Link} to="/login">
                          Login
                        </NavDropdown.Item>}
                        <NavDropdown.Item as={Link} to="settings">Settings</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="favorites">
                          Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="linkpage">
                          linkpage
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        {decodedToken.userName && <NavDropdown.Item
                          href="#action5"
                          onClick={() => confirmAction()}
                        >
                          Logout
                        </NavDropdown.Item>}
                      </NavDropdown>
                    </Nav>
                  </Col>
                  {/* <Button type="submit" variant="danger" onClick={() => confirmAction()}>
            Logout
            </Button>  */}
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </Row>
    )
}

export default NavigationBar;