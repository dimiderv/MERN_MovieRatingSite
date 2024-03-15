import * as Icon from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import {useDispatch, useSelector} from "react-redux";
import {selectSearchString, setSearch} from "../features/search/searchSlice";






const NavigationBar = ()=>{
  const navigate = useNavigate();
  const logoutHook=useLogout();
  // const {search,setSearch} = useSearch();
  const dispatch = useDispatch()
  const reduxSearch = useSelector(selectSearchString)
  const signOut = async () => {
      // if used in more components, this should be in context 
      // axios to /logout endpoint 
      await logoutHook().then(()=>{
        navigate('/');
      })
  }

const confirmAction = () => {
    const response = window.confirm("Are you sure you want to do that?");
  
    if (response) {
       signOut().then(()=>{
         console.log("Logging out")
       });
      //alert("Ok was pressed");
    } else {
      alert("Cancel was pressed");
    }
  };

  const reduxSearchHandler = (e) =>{
    dispatch(setSearch(e.target.value))
  }

  // console.log(search)
    return (
        <Row xs={12} sm={12} md={12} lg={12}>
        <Container fluid>
          <Row xs={12} sm={12} md={12} lg={12}>
            <Col xs={12}>
              <Navbar bg="light" expand="sm">
                <Icon.Film />
                <Navbar.Brand as={Link} to="home">MovieDb</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <Nav.Link as={Link} to="home">Home</Nav.Link>
                    {/* {!useExists && <Nav.Link as={Link} to="register">Register</Nav.Link>}
                    {!useExists && <Nav.Link as={Link} to="genre">Genre</Nav.Link>}
                    {!useExists && <Nav.Link as={Link} to="addmovies">Add Movies</Nav.Link>} */}
                    <Nav.Link as={Link} to="auth">Movies</Nav.Link>
                    <Nav.Link as={Link} to="upcoming">Upcoming</Nav.Link>


                  </Nav>

                  <Form className="d-flex" >
                    <Form.Control
                        id={"searchForm"}
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      value={reduxSearch}
                      onChange={(e) =>reduxSearchHandler(e)}
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>

                  <Col>
                    <Nav className="justify-content-end">
                      <NavDropdown
                        title={<Icon.PersonCircle />}
                        id="navbarScrollingDropdown"
                      >
                        {/* <NavDropdown.Item disabled href="#">
                          {decodedToken.userName}
                        </NavDropdown.Item> */}
                     {/* { !auth &&  <NavDropdown.Item as={Link} to="/login">
                          Login
                        </NavDropdown.Item>} */}
                        <NavDropdown.Item as={Link} to="settings">Settings</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="favorites">
                          Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="linkpage">
                          linkpage
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          // href="login"
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
    )
}

export default NavigationBar;