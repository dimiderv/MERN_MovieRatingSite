import { useState } from "react";
import MyCard from "./templates/MyCard";
import MyModal from "./templates/MyModal";

const Movie = ({ movie, addGoalHandler }) => {
  const { title, thumbnail } = movie;
  const [active, setActive] = useState(false);

  function handleModal() {
    setActive(!active);
  }

  return active ? (
    <MyModal show={active} onHide={handleModal} movie={movie} />
  ) : (
    // bg={'Dark'} style={{ width: "18rem", margin: "10px",background:'black'}}
    <MyCard
      title={title}
      thumbnail={thumbnail}
      handleModal={handleModal}
      addGoalHandler={() => alert("You pressed the button")}
    />
  );
};

export default Movie;
