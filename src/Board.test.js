import React from "react";
import { render, fireEvent} from "@testing-library/react";
import Board from "./Board";

describe("<Board /> render", function () {
  describe("inital board (both unwinning and winning)", function () {
    it("renders without crashing", function () {
      render(<Board />);
    });

    it("matches snapshot for inital board with all lights on", function () {
      const { asFragment, queryByText } = render(<Board chanceLightStartsOn={1} />);
      expect(asFragment()).toMatchSnapshot();
      expect(queryByText("You Won!")).not.toBeInTheDocument();
    });

    it("shows winning message when board is rendered with all lights already out", function () {
      const { asFragment, getByText } = render(<Board chanceLightStartsOn={0} />);
      expect(getByText("You Won!")).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("handle click on cell to toggle light", function () {
    it("toggles lights correctly", function () {
      const { getAllByRole } = render(
          <Board nrows={3} ncols={3} chanceLightStartsOn={1} />,
      );
      const cells = getAllByRole("button");

      // all cells are lit when board rendered with 100% chance lights are on
      cells.forEach(cell => {
        expect(cell).toHaveClass("Cell-lit");
      });

      // click on the first cell
      fireEvent.click(cells[0]);

      // now first cell should be off along with cells directly to the right and below that cell. All others should remain on

      const unlitCellIndices = [0, 1, 3];

      cells.forEach((cell, idx) => {
        if (unlitCellIndices.includes(idx)) {
          expect(cell).not.toHaveClass("Cell-lit");
        } else {
          expect(cell).toHaveClass("Cell-lit");
        }
      });
    });

  });
});
