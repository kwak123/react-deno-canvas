import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

import RoomList from "./roomList/RoomList"
import Room from "./room/Room"
import { COLORS, TYPOGRAPHY } from "./styling"
import services from "../services"

// @ts-ignore
import athenaLogo from "../assets/athena-logo.png"

const Container = styled.div``

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${COLORS.BLACK_NEAR};
  height: 64px;
  display: flex;
  align-item: flex-start;
  z-index: 100;
`

const LogoContainer = styled.div`
  height: 64px;
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  height: 48px;
`

const Title = styled.h1`
  margin-left: 8px;
  color: ${COLORS.GRAY_ICE};
  font-family: ${TYPOGRAPHY.SEN};
  font-size: 24px;
`

const ContentContainer = styled.div`
  margin-top: 64px;
  display: flex;
  padding: 32px 24px 0;
  height: calc(100vh - 96px);
  width: calc(100vw - 48px);

  @media only screen and (min-width: 1320px) {
    justify-content: center;
  }
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <LogoContainer>
              <Logo src={athenaLogo} />
              <Title>Simple React Canvas</Title>
            </LogoContainer>
          </Link>
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
      </Container>
    </BrowserRouter>
  )
}

export default Main
