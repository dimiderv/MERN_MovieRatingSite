import { useNavigate, Link } from "react-router-dom";
import MostPopular from "./MostPopular";
import TryCard from "./TryCard";
import useLogout from "../hooks/useLogout";
const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    await logout();
    navigate("/linkpage");
  };

  return (
    <section>
      <div className="justify-content-center ">
        <TryCard headline="Newest" indexStart={1239} indexEnd={1249} />
      </div>
      <div className="justify-content-center ">
        <MostPopular
          headline="Comedies"
          indexStart={270}
          indexEnd={300}
          genreFilter={"Comedy"}
        />
      </div>
      <div className="justify-content-center ">
        <TryCard headline="For you" indexStart={700} indexEnd={710} />
      </div>
      <div className="justify-content-center ">
        <TryCard headline="Most Popular" indexStart={200} indexEnd={210} />
      </div>

      {/* <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/auth">Go to the Movies page</Link>
      <br />
      <a href="/favorites">Press here to check if thats the mistake</a>
      <Link to="/favorites">Go to the Favorites</Link>
      <br />
      <Link to="/addmovies">Go to the AddMovies</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div> */}
    </section>
  );
};

export default Home;
