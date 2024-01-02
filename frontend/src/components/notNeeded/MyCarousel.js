import React from "react";
import { Carousel } from "react-bootstrap";
import MyCard from "./MyCard";
const data = require("../../data/movies.json")
  .slice(100, 110)
  .filter((movie) => {
    if (
      movie.thumbnail &&
      movie.cast.length > 0 &&
      movie.thumbnail_height > 360 &&
      movie.thumbnail_width > 240
    ) {
      return movie;
    }
    return "";
  });
// console.log(data.map(movie=>{
//      return movie.title
// }))

// const CarouselSlide = ({ key, thumbnail, title, extract }) => (
//   <Carousel.Item key={key}>
//     <img className="w-100" src={"thumbnail"} alt={title} />
//     <Carousel.Caption>
//       <p>HELLO RE MLK{extract}</p>
//     </Carousel.Caption>
//   </Carousel.Item>
// );

function MyCarousel() {
  return (
    <Carousel>
    <Carousel.Item key={1}>
    <MyCard
      title={data[0].title}
      thumbnail={data[0].thumbnail}
      addGoalHandler={() => alert("You pressed the button")}
    />
    </Carousel.Item>
    <Carousel.Item key={2}>
    <MyCard
      title={data[2].title}
      thumbnail={data[2].thumbnail}
      addGoalHandler={() => alert("You pressed the button")}
    />
    </Carousel.Item>
    <Carousel.Item key={3}>
    <MyCard
      title={data[5].title}
      thumbnail={data[5].thumbnail}
      addGoalHandler={() => alert("You pressed the button")}
    />
    </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
// {data.map((movie, i) => {
//     return <CarouselSlide
//        key={i}
//        thumbnail={movie.thumbnail}
//        title={movie.title}
//        extract={movie.extract}
//      />;
//    })}