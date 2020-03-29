import styled from "styled-components"

export const Container = styled.div`
  position: relative;
  top: 0;
  width: 300px;
  height: 320px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 6px 2px #757575;
  transition: top 0.2s, box-shadow 0.2s;

  &:hover {
    top: -4px;
    box-shadow 0 4px 12px 4px #757575;
  }
`
