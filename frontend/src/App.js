import { Switch, Route } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import FreeComponent from "./FreeComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import MovieContainer from "./components/MovieContainer";
import * as Icon from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "universal-cookie";
import Login from "./Login";
import { useState, useEffect } from "react";
import BeforeLogin from "./BeforeLogin";
import Register from "./Register";
import Favorites from "./Favorites";
// import { decode } from "jsonwebtoken";
import AddGenres from "./AddGenres";
import AddMovies from "./AddMovies";
const jwt = require("jsonwebtoken");
const cookies = new Cookies();

const logout = () => {
  // destroy the cookie

  cookies.remove("TOKEN", { path: "/" });
  // redirect user to the landing page
  window.location.href = "/";
};

const confirmAction = () => {
  const response = window.confirm("Are you sure you want to do that?");

  if (response) {
    logout();
    alert("Ok was pressed");
  } else {
    alert("Cancel was pressed");
  }
};

function App() {
  const [username, setUserName] = useState("");

  useEffect(() => {
    if (cookies.get("TOKEN")) {
      const decodedToken = jwt.verify(cookies.get("TOKEN"), "RANDOM-TOKEN");
      setUserName(decodedToken.username);
    }
  }, []);

  return (
    <Container>
      <Row xs={12} sm={12} md={12} lg={12}>
        <Container fluid>
          <Row xs={12} sm={12} md={12} lg={12}>
            <Col xs={12}>
              <Navbar bg="light" expand="sm">
                <Icon.Film />
                <Navbar.Brand href="/">MOvieDb</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/genre">Genre</Nav.Link>
                    <Nav.Link href="/addmovies">Add Movies</Nav.Link>
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
                          {username}
                        </NavDropdown.Item>
                     { !username &&  <NavDropdown.Item href="/login">
                          Login
                        </NavDropdown.Item>}
                        <NavDropdown.Item href="/auth">Movies</NavDropdown.Item>
                        <NavDropdown.Item href="/auth/favorites">
                          Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          href="#action5"
                          onClick={() => confirmAction()}
                        >
                          Logout
                        </NavDropdown.Item>
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

      {/* create routes here */}
      <Switch>
        <Route exact path="/" component={BeforeLogin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/free" component={FreeComponent} />
        <Route exact path="/genre" component={AddGenres} />
        <Route exact path="/addmovies" component={AddMovies} />
        <ProtectedRoutes exact path="/auth" component={MovieContainer} />
        <ProtectedRoutes exact path="/auth/favorites" component={Favorites} />
      </Switch>
    </Container>
  );
}

export default App;
