import * as React from "react"
import styled from "styled-components"

import Canvas from "./canvas/Canvas"
import { COLORS, TYPOGRAPHY } from "./styling"

// @ts-ignore
import athenaLogo from "../assets/athena-logo.png"

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

const Content = styled.article`
  margin-top: 32px;
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
        <Content>
          <Canvas />
        </Content>
      </Container>
    )
  }
}

export default Main
