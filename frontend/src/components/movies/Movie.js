const Movie = ({ movie, addGoalHandler }) => {
  const { title, year, thumbnail, rating, director } = movie;
  // const { title, release_date, species, producer, director } = movie;
  return (
    <li className="movie">
      <img src={thumbnail} alt={title} width="220" height="300"/>
      <p>
        {title} by {director} was released on {year}
      </p>
      <p>Rating: {rating}</p>
      <p>Rating: {director}</p>
      <div className="form-group row d-block">
        <div className="col-sm-12">
          <button
            type="submit"
            value="Send"
            onClick={()=>addGoalHandler(title)}
            className="btn btn-primary"
          >
            Post
          </button>
          {/* onClickCapture also worked */}
        </div>
      </div>
    </li>
  );
};

export default Movie;
