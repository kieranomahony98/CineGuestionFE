import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Col } from "reactstrap";
import stockImage from "images/stock-photo.jpeg";

//tw components come from template 
const Card = tw.div`h-full flex! flex-col border max-w-sm relative focus:outline-none border-2 border-gray-300`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-64 sm:h-128 bg-cover bg-center rounded`
]);


const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`flex items-center text-lg font-bold`;

const RatingsInfo = styled.div`
    ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
    svg {
      ${tw`w-6 h-6 text-yellow-500 fill-current`}
    }
  `;
const Rating = tw.span`ml-2 font-bold`;


const movieCard = ({ title, img, onClick, rating, desc, className, notRoute, md, xs }) => {
  xs = xs ? xs : "";
  md = md ? md : "";
  const imageRoute = (notRoute) ? img : `https://image.tmdb.org/t/p/original${img}`;
  return (

    <Col xs={`${xs}`} md={`${md}`} className={`${className} mb-3`}>
      <Card key={title} onClick={onClick}>
        <CardImage imageSrc={imageRoute ? imageRoute : stockImage} />
        <TextInfo>
          <TitleReviewContainer>
            <Title>{title}</Title>
            <RatingsInfo>
              <Rating>{rating}</Rating>
            </RatingsInfo>
          </TitleReviewContainer>
        </TextInfo>
      </Card>
    </Col>
  );
}

export default movieCard;