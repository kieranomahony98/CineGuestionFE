import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../headers/light.js";
import LoginModal from "components/auth/LoginModal.js";
import DowndownMenu from "../../dropdown/DropdownMenu";
import { useSelector } from "react-redux";
import RegisterModal from "components/auth/RegisterModal.js";
import Notification from "components/loginInRegisterNotification/Notification";
const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-sm sm:mx-6
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
//image licesning is free to use source:

const RightColumn = styled.div`
  background-image: url("https://images.unsplash.com/photo-1580247817119-c6cb496270a4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80");
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-2 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;


let primaryActionUrl = "#";
let primaryActionText;

const HomePageWithImage = () => {
  const isAuthenticatedNavLink = [];
  const { isAuthenticated } = useSelector(state => state.auth);
  if (isAuthenticated) {
    isAuthenticatedNavLink.push(<DowndownMenu />);
    primaryActionText = <a href={primaryActionUrl} className="action primaryAction">
      My Generations!
    </a>
    primaryActionUrl = "/myGenerations";
  } else {
    isAuthenticatedNavLink.push(<LoginModal key="login" />);
    primaryActionText = <RegisterModal key="register" className="action primaryAction" />;
    primaryActionUrl = "#";

  }

  const navLinks = [
    <NavLinks key={1} style={{ display: "inherit" }}>
      <NavLink href="/playlists/trending/now">Trending</NavLink>
      <NavLink href="/movies/discussions">Discuss</NavLink>
      <NavLink href="/Generate">Generate</NavLink>
      {isAuthenticatedNavLink}
    </NavLinks>
  ];
  const heading = (
    <>
      Find Perfect Movies
      <wbr />
      <br />
      Anywhere you go,
      <wbr />
      <br />
      <span tw="text-primary-500">To satisfy everyone.</span>
    </>
  );
  const description = "CineGuestion is a new approach to recommending movies, we believe you should have the power to decide what you watch";

  const secondaryActionUrl = "/Generate";
  const secondaryActionText = "Get Generating";
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader links={navLinks} collapseBreakpointClass="sm" style={{ display: "inherit" }} />
          <Content>
            {/* <Notification /> */}
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              {primaryActionText}
              <a href="/movies/indie/get/all" className="action secondaryAction mr-2 mb-2">
                Community Movies
              </a>
              <a href={secondaryActionUrl} className="action primaryAction">
                {secondaryActionText}
              </a>
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn></RightColumn>
      </TwoColumn>
    </Container>
  );
}
export default HomePageWithImage;
