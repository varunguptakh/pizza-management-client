import axios from "axios";
import React from "react"; // Import React
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock("axios");

// test("renders manage toppings link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Manage Toppings/i);
//   expect(linkElement).toBeInTheDocument();

// }

test("renders manage toppings link", async () => {
  axios.get.mockResolvedValue({ data: [{ name: "Cheese" }] }); // Mock API response
  render(<App />);
  const linkElement = screen.getByText(/Manage Toppings/i);
  expect(linkElement).toBeInTheDocument();
});
