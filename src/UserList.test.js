import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";

import UserForm from "./UserForm";
import UserList from "./UserList";

// React Testing Library frowns on beforeEach and would rather you call repeated code at the top level like:
const renderComponent = () => {
  const users = [
    {
      name: "joe",
      email: "joe@joe.com",
    },
    {
      name: "jones",
      email: "jones@jones.com",
    },
  ];
  render(<UserList users={users} />);

  return { users };
};

test("renders one row per user", () => {
  // Render the component
  //   const users = [
  //     {
  //       name: "joe",
  //       email: "joe@joe.com",
  //     },
  //     {
  //       name: "jones",
  //       email: "jones@jones.com",
  //     },
  //   ];
  //   render(<UserList users={users} />);

  renderComponent();

  //   screen.logTestingPlaygroundURL();
  //   Takes the HTML rendered and creates a link to view that HTML in the Testing playground tool
  //   This playground also guides you on what queries to use per element

  //   const { container } = render(<UserList users={users} />);

  //   Find all the rows in the table
  // eslint-disable-next-line testing-library/no-container
  //   const rows = container.querySelectorAll("tbody tr");
  //   gets all  trs within the tbody element
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  // this gets all the elements with 'role' row within the data-testId of 'users'

  //   const rows = screen.getAllByRole("row");

  //   both tbody and thead have role === rowgroup
  // both tr under tbody and thead have role === row, so it picks both if you just get by role
  //   if role doesn't work, use 'data-testid' or 'containerRule.querySelector()''

  //   Assertion expect correct no of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  const { users } = renderComponent();

  //   screen.logTestingPlaygroundURL();
  //   the url doesn't work for me

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
