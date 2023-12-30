import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import MovieContainer from "./components/MovieContainer";
import NavigationBar from "./components/NavigationBar";
// import Cookies from "universal-cookie";
import Login from "./components/Login";
// import { useState, useEffect } from "react";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import Layout from "./components/Layout";
// import { decode } from "jsonwebtoken";
import AddGenres from "./components/add/AddGenres";
import AddMovies from "./components/add/AddMovies";
import PrintComponent from "./PrintComponent";
import RequireAuth from "./components/RequireAuth";
import LinkPage from "./components/LinkPage";
import Home from "./components/Home";
import Missing from "./components/Missing";
import PersistLogin from "./components/PersistLogin";
import Footer from "./components/Footer";
import useAuth from "./hooks/useAuth";
import Panel from "./components/UserPanel/Panel/Panel";

function App() {
  // const [username, setUserName] = useState("");

  // useEffect(() => {
  //   if (cookies.get("TOKEN")) {
  //     const decodedToken = jwt.verify(cookies.get("TOKEN"), "RANDOM-TOKEN");
  //     setUserName(decodedToken.username);
  //   }
  // }, []);
  const { auth } = useAuth();
  document.body.style.backgroundColor = "rgb(25, 25, 37)";
  return (
    <Container className='container' flex='1'>
      {auth.token && <NavigationBar />}

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route element={<PersistLogin />}>
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="print" element={<PrintComponent />} />
            <Route path="/" element={<LinkPage />} />
            {/* Protected Routes */}
          
            <Route element={<RequireAuth />}>
              <Route path="home" element={<Home />} />
              <Route path="genre" element={<AddGenres />} />
              <Route path="addmovies" element={<AddMovies />} />
              <Route path="auth" element={<MovieContainer />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<Panel />} />
            </Route>
          </Route>
          {/* <ProtectedRoutes  path="auth" element={<MovieContainer/>} />
          <ProtectedRoutes  path="auth/favorites" element={<Favorites/>} /> */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
