import * as React from "react"
import Main from "../Main"
import { render } from "@testing-library/react"

describe("Main", () => {
  it("should render", () => {
    const { getByText } = render(<Main />)
    expect(getByText("Welcome!")).toBeInTheDocument()
  })
})
