
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import CardTemplate from "./CardTemplate"
import MultiCarousel from "react-multi-carousel";


function IntroCards() {
    const cardTitles =[
         {
            title:"This is a movieDB project",
            bodyText: "In this movie database you will be able to...",
            link:"/home"
        },
       {
            title:"Sign In",
            bodyText:"Please sign in to have access to our database",
            link:"/login"
        }, 
       {
            title:"Register", 
            bodyText:"To create an account please press here.",
            link:"/register"
        }
    ]
    
    const cards = cardTitles.map((card,i)=>{
       return <CardTemplate title={card.title} bodyText={card.bodyText} link={card.link}/>
    })
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
  return (
    
    <div>
      <h1>{"headline"}</h1>
      <MultiCarousel
        showDots={false}
        autoPlay={false}
        autoPlaySpeed={2000}
        infinite={true}
        responsive={responsive}
        transitionDuration={1000}
        
        
        containerClass="container"
        // itemClass="mx-0"
        customTransition="all 1s linear"
        // draggable
        arrows={false}
        focusOnSelect={false}
      >
        {cards}
      </MultiCarousel>
    </div>
  )
}

export default IntroCards