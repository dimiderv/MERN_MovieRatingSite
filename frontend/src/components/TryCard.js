import MultiCarousel from "react-multi-carousel";
import Product from "./Product";
import "./trycard.css";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1080 },
    items: 3,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function TryCard({headline,indexStart, indexEnd}) {

  const productData = require("../data/movies.json")
  .slice(indexStart, indexEnd)
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
  const product = productData.map((item, i) => (
    <Product
      title={item.title}
      thumbnail={item.thumbnail}
      price={"9.99$"}
      extract={item.extract}
      key={i}
      movie ={{
        title : item.title,
        thumbnail:item.thumbnail,
        cast: item.cast,
        extract: item.extract,
        genre: item.genres, 
        year: item.year
      }}
    />
  ));

  return (
    <div>
      <h1>{headline}</h1>
      <MultiCarousel
        showDots={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite={true}
        responsive={responsive}
        transitionDuration={2500}
        customTransition="all 1s linear"
        // draggable
        arrows={false}
        focusOnSelect={false}
      >
        {product}
      </MultiCarousel>
    </div>
  );
}
