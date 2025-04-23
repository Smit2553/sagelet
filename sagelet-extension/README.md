# Sagelet Extension

Sagelet is a lightweight, hotkey-activated browser extension overlay that provides instant access to a language model for contextual queries on any webpage. It emphasizes speed, minimal UI, and a "Bring Your Own LLM" (BYOL) model.

## Getting Started

To get started with the Sagelet extension, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd sagelet-extension
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the development server**:
   ```
   npm run dev
   ```

4. **Load the extension in your browser**:
   - For Chrome: Go to `chrome://extensions/`, enable "Developer mode", and click "Load unpacked". Select the `public` directory.
   - For Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select the `manifest.json` file in the `public` directory.

## Features

- **Hotkey Activation**: Activate the overlay using a global hotkey.
- **Contextual Queries**: Interact with a language model based on the current webpage context.
- **Customizable Settings**: Users can configure their preferred LLM endpoint and API key.

## Project Structure

- `src/`: Contains the source code for the extension.
  - `background.ts`: Background script for managing events.
  - `content.ts`: Content script for interacting with web pages.
  - `popup/`: Contains the popup interface files.
  - `options/`: Contains the options page files.
  - `utils/`: Utility functions for API calls.
  - `assets/`: Contains icons and other assets.
- `public/`: Contains the manifest file and other public resources.
- `package.json`: NPM configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `vite.config.ts`: Vite configuration file.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on how to contribute to the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.