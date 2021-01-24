import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as Video } from "feather-icons/dist/icons/video.svg";
// import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import weeklyPlaylist from "../../images/cineGuestion/test.png";
import monthlyPlaylist from "../../images/cineGuestion/monthlyPlaylist.png";
import allTime from "../../images/cineGuestion/allTime.png";
import { useSelector } from "react-redux";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
// const ControlButton = styled(PrimaryButtonBase)`
//   ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
//   svg {
//     ${tw`w-6 h-6`}
//   }
// `;
// const PrevButton = tw(ControlButton)``;
// const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;

const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

// const RatingsInfo = styled.div`
//   ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
//   svg {
//     ${tw`w-6 h-6 text-yellow-500 fill-current`}
//   }
// `;
// const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const { isAuthenticated } = useSelector(state => state.auth);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  /* Change this according to your needs */
  const cards = [
    {
      imageSrc: weeklyPlaylist,
      title: "Weekly Playlist",
      description: (isAuthenticated) ? "A carefully curated playlist to help you find new movies based on your previous week of watching. Your playlist will be automatically made every monday night!" : "If you would like to get personalised playlists make sure to register!",
      locationText: "Why not give it a go!",
      type: "weeklyPlaylist"

    },
    {
      imageSrc: monthlyPlaylist,
      title: "Montly Playlist",
      description: (isAuthenticated) ? "Our carefully curated playlist to help you find new movies based on your previous month of watching. Your playlist will be made every month!" : "If you would like to get personalised playlists make sure to register!",
      locationText: "Why not give it a go!",
      type: "monthlyPlaylist"
    },
    {
      imageSrc: allTime,
      title: "Complete Playlist",
      description: (isAuthenticated) ? "Our carefully curated playlist to match who are you, this playlist is based on all your curations with us to help you rekindle some past favourites." : "If you would like to get personalised playlists make sure to register!",
      locationText: "Why not give it a go!",
      type: "allTimePlaylist"
    }
  ];

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Generated Playlists</Heading>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <Video />
                    </IconContainer>
                    <Text>{card.locationText}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>{card.description}</Description>
              </TextInfo>
              <a href={`/playlists/${card.type}`}>
                <PrimaryButton>View Now!</PrimaryButton>
              </a>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
