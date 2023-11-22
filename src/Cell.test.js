import React from "react";
import { render, screen } from "@testing-library/react";
import Cell from "./Cell";

describe("<Cell /> rendering", function () {
  let table, tbody, documentBody;

  beforeEach(function () {
    // Add a table and table row to the document so that TDs can go inside a TR
    table = document.createElement("table");
    tbody = table.createTBody();
    const row = tbody.insertRow();
    const cell = row.insertCell();
    documentBody = document.body.appendChild(table);
  });

  it("renders without crashing", function () {
    render(<Cell />, { container: documentBody.firstChild.firstChild });
  });

  it("matches snapshot when lit", function () {
    render(<Cell isLit={true} />, { container: documentBody.firstChild.firstChild });
    expect(documentBody).toMatchSnapshot();
  });

  it("matches snapshot when not lit", function () {
    render(<Cell isLit={false} />, { container: documentBody.firstChild.firstChild });
    expect(documentBody).toMatchSnapshot();
  });
});

