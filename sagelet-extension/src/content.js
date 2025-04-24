/**
 * Content script for Sagelet extension
 * Runs in the context of web pages
 */

// Use the browser global that extension environments provide
const browser = globalThis.browser || globalThis.chrome;

// Initialize the content script
function initialize() {
  console.log("Sagelet content script initialized");

  // Example of communicating with the background script
  async function getSettings() {
    try {
      const response = await browser.runtime.sendMessage({
        type: "GET_SETTINGS",
      });

      if (response.success) {
        console.log("Retrieved settings:", response.settings);
        return response.settings;
      } else {
        console.error("Error retrieving settings:", response.error);
        return null;
      }
    } catch (error) {
      console.error("Error communicating with background script:", error);
      return null;
    }
  }

  // Create or toggle the overlay visibility
  let overlayElement = null;

  function toggleOverlay() {
    if (overlayElement) {
      // If overlay exists, toggle its visibility
      const isVisible = overlayElement.style.display !== "none";
      overlayElement.style.display = isVisible ? "none" : "block";
      return;
    }

    // If overlay doesn't exist yet, create it
    createOverlay();
  }

  // Create the overlay element in the page
  function createOverlay() {
    // Create overlay container
    overlayElement = document.createElement("div");
    overlayElement.id = "sagelet-overlay";
    overlayElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      max-width: 90%;
      max-height: 80%;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      z-index: 2147483647;
      overflow: hidden;
      display: block;
    `;

    // For now, just create a placeholder content
    // This will be replaced with actual UI in future implementations
    const content = document.createElement("div");
    content.style.cssText = `
      padding: 20px;
      text-align: center;
    `;
    content.innerHTML = `
      <h2>Sagelet Overlay</h2>
      <p>This is a placeholder for the Sagelet overlay.</p>
      <button id="sagelet-close">Close</button>
    `;

    overlayElement.appendChild(content);
    document.body.appendChild(overlayElement);

    // Add close button functionality
    document.getElementById("sagelet-close").addEventListener("click", () => {
      overlayElement.style.display = "none";
    });
  }

  // Listen for messages from the background script
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);

    if (message.type === "TOGGLE_OVERLAY") {
      toggleOverlay();
      sendResponse({ success: true });
      return true;
    }

    return false;
  });
}

// Run the initialization
initialize();
