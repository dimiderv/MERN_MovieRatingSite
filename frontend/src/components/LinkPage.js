import { Link } from "react-router-dom"
import MyCarousel from "./templates/MyCarousel"
import CarouselWithMultipleCards from './templates/CarouselWithMultipleCards'
import TryCard from "./TryCard"
const LinkPage = () => {
    return (
        <div>
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <p>This a movie site where users can customise their details, add movies to favorites and will add many mor things.</p>
            <br />
            <h2>Private</h2>
            <Link to="home">Home (is going to be login)</Link>
            <Link to="/favorites">favorites</Link>
            <Link to="/auth">Shows movies</Link>
            
        </section>
        <br></br>
        <br></br>
        <br></br>
        <div>
                {/* <CarouselWithMultipleCards /> */}
          <TryCard />
            
        </div>
        </div>
    )
}

export default LinkPage
