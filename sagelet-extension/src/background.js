/**
 * Background script for Sagelet extension
 * Handles extension lifecycle events and communications
 */

// Instead of importing, we use the browser global that extension environments provide
const browser = globalThis.browser || globalThis.chrome;

// Initialize extension when installed or updated
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Sagelet extension installed");
    // Set default settings if needed
    browser.storage.local.set({
      apiEndpoint: "",
      apiKey: "",
      modelName: "gpt-4o",
    });
  } else if (details.reason === "update") {
    console.log(
      "Sagelet extension updated to version",
      browser.runtime.getManifest().version
    );
  }
});

// Listen for messages from content scripts or popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message, "from:", sender);

  // Handle different types of messages here
  if (message.type === "GET_SETTINGS") {
    browser.storage.local
      .get(["apiEndpoint", "apiKey", "modelName"])
      .then((settings) => {
        sendResponse({ success: true, settings });
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
        sendResponse({ success: false, error: error.message });
      });

    // Return true to indicate we will send a response asynchronously
    return true;
  }

  // Handle toggle overlay request
  if (message.type === "TOGGLE_OVERLAY") {
    toggleOverlay(sender.tab.id)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error("Error toggling overlay:", error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});

// Handle keyboard commands
browser.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);

  if (command === "toggle_overlay") {
    try {
      // Get the active tab
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0) {
        await toggleOverlay(tabs[0].id);
      }
    } catch (error) {
      console.error("Error handling command:", error);
    }
  }
});

// Function to toggle the overlay in a specific tab
async function toggleOverlay(tabId) {
  if (!tabId) return;

  try {
    // Send a message to the content script to toggle the overlay
    await browser.tabs.sendMessage(tabId, { type: "TOGGLE_OVERLAY" });
  } catch (error) {
    console.error("Error sending toggle message to content script:", error);
    // If the content script isn't loaded yet, we might need to inject it
    // This could happen if the extension is installed and immediately used
    try {
      await browser.scripting.executeScript({
        target: { tabId },
        files: ["content.js"],
      });
      // Try sending the message again after injecting
      await browser.tabs.sendMessage(tabId, { type: "TOGGLE_OVERLAY" });
    } catch (injectError) {
      console.error("Error injecting content script:", injectError);
      throw injectError;
    }
  }
}
