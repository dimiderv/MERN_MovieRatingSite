import React from 'react';
import { Carousel, Card, Button,Container } from 'react-bootstrap';

const CarouselWithMultipleCards = () => {
  const cardData = [
    { id: 1, title: 'Card title 1', description: 'Some quick example text 1', imageUrl: 'https://example.com/image1.jpg' },
    { id: 2, title: 'Card title 2', description: 'Some quick example text 2', imageUrl: 'https://example.com/image2.jpg' },
    { id: 3, title: 'Card title 3', description: 'Some quick example text 3', imageUrl: 'https://example.com/image3.jpg' },
    { id: 4, title: 'Card title 4', description: 'Some quick example text 4', imageUrl: 'https://example.com/image4.jpg' },
    { id: 5, title: 'Card title 5', description: 'Some quick example text 5', imageUrl: 'https://example.com/image5.jpg' },
  ];

  return (
<Container>


    <Carousel controls={true} >
      {cardData.map((card, index) => (
        <Carousel.Item key={card.id} className={index === 0 ? 'active' : ''}>
          <div className="cards-wrapper">
            {cardData.map((otherCard, otherIndex) => (
              <Card key={otherCard.id} className={`card ${otherIndex >= index && otherIndex <= index + 2 ? '' : 'd-none d-md-block'}`}>
                <Card.Img src={otherCard.imageUrl} className="card-img-top" alt="Card image" />
                <Card.Body>
                  <Card.Title>{otherCard.title}</Card.Title>
                  <Card.Text>{otherCard.description}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel></Container>
  );
};

export default CarouselWithMultipleCards;
