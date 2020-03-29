import * as React from "react"
import styled from "styled-components"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import RoomList from "./roomList/RoomList"
import Canvas from "./canvas/Canvas"
import { COLORS, TYPOGRAPHY } from "./styling"

import mockRoomList from "./mockRoomList"

// @ts-ignore
import athenaLogo from "../assets/athena-logo.png"
import { RoomResponse } from "../services/rooms"

const Container = styled.div``

const Header = styled.header`
  background-color: ${COLORS.BLACK_NEAR};
  height: 64px;
  display: flex;
  align-item: flex-start;
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
  display: flex;
  justify-content: center;
  padding: 32px 24px 0;
  height: calc(100vh - 96px);
  width: calc(100vw - 48px);
`

const Content = styled.article`
  max-width: 1320px;
  width: 1320px;
`

class Main extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <LogoContainer>
            <Logo src={athenaLogo} />
            <Title>Simple React Canvas</Title>
          </LogoContainer>
        </Header>
        <ContentContainer>
          <Content>
            <BrowserRouter>
              <Switch>
                <Route path="/room/:roomId">
                  <Canvas />
                </Route>
                <Route path="/">
                  <RoomList roomList={mockRoomList} />
                </Route>
              </Switch>
            </BrowserRouter>
          </Content>
        </ContentContainer>
      </Container>
    )
  }
}

export default Main
