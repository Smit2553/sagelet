import { render } from "preact";
import { Options } from "./options";
import "./options.css";

// Render the Options component to the root element
const root = document.getElementById("options-root");
if (root) {
  render(<Options />, root);
}
