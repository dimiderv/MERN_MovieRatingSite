import CardTemplate from "./CardTemplate"
import MultiCarousel from "react-multi-carousel";


function IntroCards() {

    const cardTitles =[
         {
            title:"This is a movieDB project",
            bodyText: "In this movie database you will be able to...",
            link:"/home",
             thumbnail:'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070' +
                 '&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdl' +
                 'fHx8fGVufDB8fHx8fA%3D%3D'
        },
       {
            title:"Sign In",
            bodyText:"Please sign in to have access to our database",
            link:"/login", thumbnail: "https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?q=80&" +
               "w=1967&auto" +
               "=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
       {
            title:"Register",
            bodyText:"To create an account please press here.",
            link:"/register",
           thumbnail: "https://plus.unsplash.com/premium_photo-1661410866488-f9c16c7c46aa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        }
    ]
    
    const cards = cardTitles.map((card,i)=>{
       return <CardTemplate key={card.title} title={card.title} bodyText={card.bodyText} link={card.link} thumbnail={card.thumbnail}/>
    })
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
  return (
    
    <div>

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
        arrows={true}
        focusOnSelect={false}
      >
        {cards}
      </MultiCarousel>
    </div>
  )
}

export default IntroCards