import React from "react";

export function RoleExample() {
  return (
    <div>
      <a href="/">Link</a>
      <button>Button</button>
      <h1>Heading</h1>
      <footer>Myfooter</footer>
      <header>Header Banner</header>
      <img alt="description" /> img
      <input type="text" /> Text
      <input type="number" /> Spinbutton
    </div>
  );
}

// accessible name = text within the component, does not work for input fields
export function AccessibleName() {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
    </div>
  );
}

export function AccessibleNamesByHTMLFor() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" />

      <label htmlFor="search">Search</label>
      <input id="search" />
    </div>
  );
}

export function AccessibleNamesByAriaLabel() {
  return (
    <div>
      <button aria-label="open">
        <svg />
      </button>

      <button aria-label="close">
        <svg />
      </button>
    </div>
  );
}

export function ColorList() {
  return (
    <ul>
      <li>Red</li>
      <li>Green</li>
      <li>Blue</li>
    </ul>
  );
}
