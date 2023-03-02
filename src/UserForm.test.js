import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // Three steps

  // render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion - make syre the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

// // Not the best implementation
// test("it calls onUserAdd when the form is submitted", () => {
//   const argList = [];
//   //   we're simulating onUserAdd function with a custom callback
//   const callback = (...args) => {
//     argList.push(args);
//   };

//   // Try to rende the component
//   render(<UserForm onUserAdd={callback} />);

//   //   Find the two inputs
// brittle test, because if the order of inputs in the form are changed, it'll fail
//   const [nameInput, emailInput] = screen.getAllByRole("textbox");

//   //   Simulate typing in a name
//   user.click(nameInput);
//   user.keyboard("joe");

//   //   Simulate typing in an email
//   user.click(emailInput);
//   user.keyboard("joe@joe.com");

//   //   Find the button
//   const button = screen.getByRole("button");

//   // Simulate clicking the button
//   user.click(button);

//   //   Assertion to make sure 'onUserAdd' gets called with emil/name
//   expect(argList).toHaveLength(1);
//   expect(argList[0][0]).toEqual({ name: "joe", email: "joe@joe.com" });
// });

test("it calls onUserAdd when the form is submitted", () => {
  // Using a mock function
  const mock = jest.fn();

  // Try to render the component
  // render(<UserForm onUserAdd={callback} />);
  render(<UserForm onUserAdd={mock} />);

  //   Find the two inputs
  // react testing library prefers getByRole
  // const nameInput = screen.getAllByLabelText(/enter name/i )
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /enter email/i });
  // the above matches regardless of case, as long as that text exists within the textbox label
  // passing a string, means it checks for an exact match
  // passing a regex with /.../i means it checks if it has that value, regardless of casing

  //   Simulate typing in a name
  user.click(nameInput);
  user.keyboard("joe");

  //   Simulate typing in an email
  user.click(emailInput);
  user.keyboard("joe@joe.com");

  //   Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  user.click(button);

  //   Assertion to make sure 'onUserAdd' gets called with emil/name
  // expect(argList).toHaveLength(1);
  // expect(argList[0][0]).toEqual({ name: "joe", email: "joe@joe.com" });

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "joe", email: "joe@joe.com" });
});

test("empties the two input fields when form is submitted", () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /enter email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("joe");
  user.click(emailInput);
  user.keyboard("joe@joe.com");
  user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
