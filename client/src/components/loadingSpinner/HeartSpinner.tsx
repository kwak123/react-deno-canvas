import React from "react"
import styled, { keyframes } from "styled-components"
import { COLORS } from "../styling"

const ldsHeart = keyframes`
0% {
  transform: scale(0.95);
}
5% {
  transform: scale(1.1);
}
39% {
  transform: scale(0.85);
}
45% {
  transform: scale(1);
}
60% {
  transform: scale(0.95);
}
100% {
  transform: scale(0.9);
}
`

const HeartOuter = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
`

interface HeartInnerProps {
  backgroundColor: string
}

const HeartInner = styled.div<HeartInnerProps>`
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: ${(props) => props.backgroundColor};
  animation: ${ldsHeart} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);

  &:after,
  &:before {
    content: " ";
    position: absolute;
    display: block;
    width: 32px;
    height: 32px;
    background: ${(props) => props.backgroundColor};
  }

  &:before {
    left: -24px;
    border-radius: 50% 0 0 50%;
  }

  &:after {
    top: -24px;
    border-radius: 50% 50% 0 0;
  }
`

interface HeartSpinnerProps {
  backgroundColor?: COLORS
}
const HeartSpinner: React.FC<HeartSpinnerProps> = ({
  backgroundColor = COLORS.WHITE_PLAIN,
}) => {
  return (
    <HeartOuter>
      <HeartInner backgroundColor={backgroundColor} />
    </HeartOuter>
  )
}

export default HeartSpinner
