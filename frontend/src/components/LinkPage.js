import { Link } from "react-router-dom"
import MyCarousel from "./templates/MyCarousel"
import CarouselWithMultipleCards from './templates/CarouselWithMultipleCards'
import TryCard from "./TryCard"
import { Card } from "react-bootstrap"
import IntroCards from "./templates/IntroCards"
import {Nav,Button} from "react-bootstrap"
const LinkPage = () => {



    return (
        <div>
        <section>
            <h1>MovieDB</h1>
            <br />
            <h2>What is MovieDB?</h2>
            <IntroCards/>
            <br />
            <h2>Preview</h2>
            <TryCard />
            <Link to="home">Home (is going to be login)</Link>
            <Link to="/favorites">favorites</Link>
            <Link to="/auth">Shows movies</Link>

        </section>
        <br></br>
        <br></br>
        <br></br>
        <div>
                {/* <CarouselWithMultipleCards /> */}
          
            
        </div>
        </div>
    )
}

export default LinkPage
