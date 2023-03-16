import React, { useEffect, useState } from "react";

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

export function LoadableColorList() {
  const [colors, setColors] = useState([]);

  function fakeFetchColors() {
    return Promise.resolve(["red", "green", "blue"]);
    // same as fetch("/api/colors"), only this one is simulated to resolve.
  }

  useEffect(() => {
    fakeFetchColors().then((c) => setColors(c));
  }, []);

  const renderedColors = colors.map((color, index) => {
    return <li key={index}>{color}</li>;
  });

  return <ul>{renderedColors}</ul>;
}

export function DataForm() {
  const [email, setEmail] = useState("asd@asd.com");

  return (
    <form>
      <h3>Enter Data</h3>

      <div data-testid="image wrapper">
        <img alt="data" src="data.jpg" />
      </div>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="color">Color</label>
      <input id="color" type="text" placeholder="Red" />

      <button title="Click when ready to submit">Submit</button>
    </form>
  );
}

export function CustomForm() {
  return (
    <div>
      <button>Return</button>
      {/* form has no default role, have to use this to get form by role */}
      <form aria-label="form">
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
