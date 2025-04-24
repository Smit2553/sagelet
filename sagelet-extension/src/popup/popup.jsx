import { render } from "preact";

export function Popup() {
  return (
    <div>
      <h1>Welcome to the Sagelet Extension!</h1>
      <p>This is a simple popup for the Sagelet extension.</p>
    </div>
  );
}

// Render the Popup component to the popup-root element
render(<Popup />, document.getElementById("popup-root"));
