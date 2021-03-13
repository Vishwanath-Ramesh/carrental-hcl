import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElement,
  act,
} from "@testing-library/react";

import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
} from "@testing-library/react";

import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import App from "./App";

import handlers from "./mocks/handlers";

const server = setupServer(handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("document should contain Online Car Rental Service", () => {
  render(<App />);

  const bookingElement = screen.getByText(/Online Car Rental Service/i);

  expect(bookingElement).toBeInTheDocument();
});

test("should contain And over ange over port", async () => {
  render(<App />);
  fireEvent.click(screen.getByTestId("car_4"));
});

test("should cal valid rent amount-payable", async () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("car_4"));

  fireEvent.click(screen.getByTestId("duration_12"));

  await waitFor(() =>
    expect(screen.getByTestId("amount-payable")).toHaveTextContent(
      /Payable Amount : ₹ 1200000/i
    )
  );
});

test("should create a rental booking", async () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("car_4"));

  fireEvent.click(screen.getByTestId("duration_12"));

  await waitFor(() =>
    expect(screen.getByTestId("amount-payable")).toHaveTextContent(
      /Payable Amount : ₹ 1200000/i
    )
  );

  fireEvent.change(screen.getByTestId(/name/i), {
    target: { value: parseFloat("ram") },
  });

  fireEvent.change(screen.getByTestId(/email/i), {
    target: { value: parseFloat("ram@gmail.com") },
  });

  fireEvent.change(screen.getByTestId(/mobile/i), {
    target: { value: parseFloat("+91-1234567891") },
  });

  fireEvent.click(screen.getByTestId("submitbtn"));
});
