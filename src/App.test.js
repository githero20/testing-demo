import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("adds a new user and shows it on the list", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("jones");

  user.click(emailInput);
  user.keyboard("jones@gmail.com");

  user.click(button);

  const nameInList = screen.getByRole("cell", { name: "jones" });
  const mailInList = screen.getByRole("cell", { name: "jones@gmail.com" });
  // passing a string, means it checks for an exact match
  // passing a regex with /.../i means it checks if it has that value, regardless of casing

  expect(nameInList).toBeInTheDocument();
  expect(mailInList).toBeInTheDocument();
});
