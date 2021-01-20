import React from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import { Col } from 'reactstrap';
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-64 sm:h-128 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
    ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
    svg {
      ${tw`w-6 h-6 text-yellow-500 fill-current`}
    }
  `;
const Rating = tw.span`ml-2 font-bold`;

// const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
    ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
    svg {
      ${tw`w-3 h-3`}
    }
  `;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const movieCard = ({ title, img, onClick, rating, desc, className }) => {

  const imageRoute = `https://image.tmdb.org/t/p/original${img}`;
  return (
    <Col className={className}>
      <Card key={title} onClick={onClick}>
        <CardImage imageSrc={imageRoute} />
        <TextInfo>
          <TitleReviewContainer>
            <Title>{title}</Title>
            <RatingsInfo>
              <Rating>{rating}</Rating>
            </RatingsInfo>
          </TitleReviewContainer>
          {/* <Description>{desc}</Description> */}
        </TextInfo>
      </Card>
    </Col>
  );
}

export default movieCard;