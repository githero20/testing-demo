import { render, screen } from "@testing-library/react";
import {
  AccessibleName,
  AccessibleNamesByAriaLabel,
  AccessibleNamesByHTMLFor,
  ColorList,
  RoleExample,
} from "./RoleExample";

test("can find elements by role", () => {
  render(<RoleExample />);

  const roles = [
    "link",
    "button",
    "heading",
    "contentinfo",
    "banner",
    "img",
    "textbox",
    "spinbutton",
  ];

  for (let role of roles) {
    const el = screen.getByRole(role);

    expect(el).toBeInTheDocument();
  }
});

test("can select by accessible name", () => {
  render(<AccessibleName />);

  const submitButton = screen.getByRole("button", {
    name: /submit/i,
  });
  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

test("shows an email and search input", () => {
  render(<AccessibleNamesByHTMLFor />);

  // we're able to use this accessible name for input fields because of the
  // htmlFor on the label that is tied to the id of the input textbox
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  const searchInput = screen.getByRole("textbox", {
    name: /search/i,
  });

  expect(emailInput).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});

test("find element by label", () => {
  render(<AccessibleNamesByAriaLabel />);

  // we're able to use this accessible name for buttons without children
  //  because of the aria-label that is tied to the button
  const openBtn = screen.getByRole("button", {
    name: /open/i,
  });
  const closeBtn = screen.getByRole("button", {
    name: /close/i,
  });

  expect(openBtn).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();
});

test("finding 0 elements on query types", async () => {
  render(<AccessibleNamesByAriaLabel />);

  // expecting it to throw an error because it doesn't exist
  expect(() => screen.getByRole("listitem")).toThrow();

  // will return null f it doesn't exist
  expect(screen.queryByRole("listitem")).toEqual(null);

  let errorThrown = false;
  try {
    await screen.findByRole("listitem");
  } catch (error) {
    errorThrown = true;
  }

  expect(errorThrown).toEqual(true);
});

test("finding 1 element on query types", async () => {
  render(<ColorList />);

  // expecting it to throw an error because it doesn't exist
  expect(screen.getByRole("list")).toBeInTheDocument();

  // will return null f it doesn't exist
  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByRole("list")).toBeInTheDocument();

  expect(await screen.findByRole("list")).toBeInTheDocument(true);
});

test("finding > 1 element on query types with singular element queries", async () => {
  render(<ColorList />);

  // expecting all to throw an error because it is more than 1
  expect(() => screen.getByRole("listitem")).toThrow();

  expect(() => screen.queryByRole("listitem")).toThrow();

  let errorThrown = false;
  try {
    await screen.findByRole("listitem");
  } catch (error) {
    errorThrown = true;
  }

  expect(errorThrown).toEqual(true);
});
