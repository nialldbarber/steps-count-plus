import React from "react";
import { render, screen } from "@testing-library/react-native";
import DashboardScreen from "./dashboard";

describe("Screen -> Stats", () => {
  beforeEach(() => {
    render(<DashboardScreen />);
  });

  test("test that it renders", () => {
    const filterText = screen.getByText("screen.stats.filterText");
    expect(filterText).toBeTruthy();
  });
});
