import { Link } from "react-router-dom"
import TryCard from "../templates/TryCard"
import IntroCards from "../templates/IntroCards"
const LinkPage = () => {



    return (
        <div>
            <section>
                <h1>MovieDB</h1>
                <br/>
                <h2>What is MovieDB?</h2>
                <IntroCards/>
                <br/>
                <h2>Preview</h2>
                {/*<TryCard />*/}
                <Link to="home">Home (is going to be login)</Link>
                <br/>
                <Link to="/favorites">favorites</Link>
                <br/>
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
