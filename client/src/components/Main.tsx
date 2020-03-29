import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

import RoomList from "./roomList/RoomList"
import Room from "./room/Room"
import { COLORS, TYPOGRAPHY } from "./styling"
import services from "../services"

// @ts-ignore
import athenaLogo from "../assets/athena-logo.png"
import Sidebar from "./room/Sidebar"

const Container = styled.div`
  overflow: hidden;
  height: 100vh;
`

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${COLORS.BLACK_NEAR};
  height: 4rem;
  display: flex;
  align-item: flex-start;
  z-index: 100;
`

const LogoContainer = styled.div`
  height: 4rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  height: 3rem;
`

const slideRight = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

const Title = styled.h1`
  margin-left: 8px;
  color: ${COLORS.GRAY_ICE};
  font-family: ${TYPOGRAPHY.SEN};
  font-size: 24px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    visibility: hidden;
  }

  &:hover::before {
    visibility: visible;
    animation: ${slideRight} 0.2s forwards cubic-bezier(0.37, 0, 0.63, 1);
  }
`

const ContentContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  padding: 2rem 1.5rem 0;
  height: calc(100vh - 96px);
  width: calc(100vw - 3rem);
  overflow: scroll;

  @media only screen and (min-width: 1320px) {
    justify-content: center;
  }
`

const LogoLink = styled(Link)`
  text-decoration: none;
`

const Content = styled.article`
  max-width: 1320px;
  width: 1320px;
`

const Main = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header>
          <LogoLink to="/">
            <LogoContainer>
              <Logo src={athenaLogo} />
              <Title>Simple React Canvas</Title>
            </LogoContainer>
          </LogoLink>
        </Header>
        <ContentContainer>
          <Content>
            <Switch>
              <Route path="/room/:roomId">
                <Room />
              </Route>
              <Route path="/">
                <RoomList />
              </Route>
            </Switch>
          </Content>
        </ContentContainer>
        <Sidebar />
      </Container>
    </BrowserRouter>
  )
}

export default Main
