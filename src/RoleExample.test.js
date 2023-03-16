import { render, screen, within } from "@testing-library/react";
import {
  AccessibleName,
  AccessibleNamesByAriaLabel,
  AccessibleNamesByHTMLFor,
  ColorList,
  CustomForm,
  DataForm,
  LoadableColorList,
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

  expect(screen.getByRole("list")).toBeInTheDocument();

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

test("finding all elements", async () => {
  render(<ColorList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);

  expect(screen.queryAllByRole("listitem")).toHaveLength(3);

  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

test("favor findBy or findAllBy when data fetching", async () => {
  render(<LoadableColorList />);

  // will throw an error because we're calling an async function
  // const els = screen.getAllByRole("listitem");

  const els = await screen.findAllByRole("listitem");

  expect(els).toHaveLength(3);
});

test("selecting different elements", () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole("button"), // most used
    screen.getByText("Enter Data"), // second most used
    screen.getByLabelText("Email"),
    screen.getByPlaceholderText("Red"),
    screen.getByDisplayValue("asd@asd.com"),
    screen.getByAltText("data"),
    screen.getByTitle(/ready to submit/i),
    screen.getByTestId("image wrapper"), // last option
  ];

  for (let element of elements) {
    expect(element).toBeInTheDocument();
  }
});

test("the form displays 2 buttons", () => {
  render(<CustomForm />);

  const form = screen.getByRole("form");
  const buttons = within(form).getAllByRole("button");

  expect(buttons).toHaveLength(2);
});

// Adding a custom matcher
const toContainRole = (container, role, quantity = 1) => {
  const elements = within(container).queryAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected to find ${quantity} ${role} elements, found ${elements.length} instead`,
  };
};

expect.extend({ toContainRole });

test("the form displays 2 buttons with custom elements", () => {
  render(<CustomForm />);

  const form = screen.getByRole("form");

  expect(form).toContainRole("button", 2);
});
