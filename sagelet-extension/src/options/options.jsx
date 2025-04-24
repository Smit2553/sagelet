import { useState, useEffect } from "preact/hooks";

// Use the browser global that extension environments provide
const browser = globalThis.browser || globalThis.chrome;

export function Options() {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [modelName, setModelName] = useState("");
  const [status, setStatus] = useState("");

  // Load settings when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      // Use browser.storage.local API for extension storage
      const result = await browser.storage.local.get([
        "apiEndpoint",
        "apiKey",
        "modelName",
      ]);
      setApiEndpoint(result.apiEndpoint || "");
      setApiKey(result.apiKey || "");
      setModelName(result.modelName || "");
    };

    loadSettings().catch(console.error);
  }, []);

  const handleSave = async () => {
    // Save settings using browser.storage.local API
    try {
      await browser.storage.local.set({
        apiEndpoint,
        apiKey,
        modelName,
      });
      setStatus("Settings saved successfully!");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setStatus("Error saving settings. Please try again.");
    }
  };

  return (
    <div>
      <h1>Extension Options</h1>
      <div>
        <label>
          API Endpoint:
          <input
            type="url"
            value={apiEndpoint}
            onInput={(e) => setApiEndpoint(e.currentTarget.value)}
            placeholder="https://api.example.com/v1"
          />
        </label>
      </div>
      <div>
        <label>
          API Key:
          <input
            type="password"
            value={apiKey}
            onInput={(e) => setApiKey(e.currentTarget.value)}
            placeholder="Your API key"
          />
        </label>
      </div>
      <div>
        <label>
          Model Name:
          <input
            type="text"
            value={modelName}
            onInput={(e) => setModelName(e.currentTarget.value)}
            placeholder="e.g., gpt-4o"
          />
        </label>
      </div>
      <button onClick={handleSave}>Save Settings</button>
      {status && <div className="status-message">{status}</div>}
    </div>
  );
}
