# Sagelet Roadmap

## Project Overview

Sagelet is a lightweight, hotkey-activated browser extension overlay that provides instant access to a language model for contextual queries on any webpage. It emphasizes speed, minimal UI, and a "Bring Your Own LLM" (BYOL) model.

## Vision

To build the fastest and most seamless way to interact with large language models directly within the user's browsing experience — respecting privacy, supporting custom LLM endpoints, and working across all major browsers.

## Key Principles

- **Fast & Responsive:** The overlay appears instantly via a global hotkey.
- **Contextual:** Initially understands page context via screenshots, with future support for DOM/text extraction.
- **Lightweight:** Minimal impact on page performance or browser memory.
- **BYOL:** Users provide their preferred OpenAI-compatible LLM endpoint and API key.
- **Inline UI:** Appears as part of the current webpage without switching tabs or windows.
- **Cross-Platform:** Uses standard Web Extensions APIs for compatibility across Chrome, Firefox, Edge, and Safari.

---

## Roadmap Phases

### Phase 1: Core Functionality (Alpha)

**Goal:** Build the base overlay, BYOL LLM integration, and hotkey activation.

**Key Features:**

- Cross-platform extension setup using Web Extensions API (Manifest V3).
- Hotkey listener (`Ctrl+Space` / `Cmd+Space` / `User Defined`) via `browser.commands`.
- Inline overlay UI with Preact and Tailwind CSS.
- Basic chat interface: input + text-only output.
- Settings panel for:
  - API Endpoint URL (OpenAI-compatible)
  - API Key
  - Model Name (optional)
- Secure local storage using `browser.storage.local`.
- Minimal LLM API client (POST request with prompt).
- Graceful error handling (auth failures, request timeouts).

**Tech Focus:** Overlay mounting via content scripts, Tailwind JIT within extension, `browser.commands` for hotkeys, secure settings storage, manifest cross-browser syntax validation.

**Deliverable:** A functioning browser extension that connects to a user-supplied LLM and returns simple responses.

---

### Phase 2: Context & Refinement (Beta)

**Goal:** Add contextual awareness and polish the chat experience.

**Key Features:**

- Screenshot support using `browser.tabs.captureVisibleTab`.
- Encode screenshot (base64) and pass it to multimodal LLMs (if supported).
- Automatically include captured context in chat prompts.
- Chat UI upgrades:
  - Streaming response display
  - Markdown rendering (code blocks, bullet points, etc.)
  - Typing/loading animations
  - Chat state persistence during overlay session
- Draggable overlay and improved screen positioning
- “Clear chat” button
- Enhanced form validation and user feedback in settings

**Tech Focus:** Async capture & encoding, image-to-prompt flow, markdown parser integration, state management within a live DOM environment.

**Deliverable:** An intelligent overlay that contextualizes pages and provides richer responses.

---

### Phase 3: Polish & Expansion (v1.0)

**Goal:** Production-ready release with a smooth user experience.

**Key Features:**

- Local chat history (optional, scoped per domain or session)
- Select-to-context: include user-selected text in prompt when activating overlay
- Advanced LLM parameter controls: `temperature`, `top_p`, model override, etc.
- Onboarding flow for first-time users
- Accessibility improvements (keyboard nav, ARIA roles)
- Performance audits for resource optimization
- Documentation: usage guide, troubleshooting, and API setup instructions
- Distribution-ready: tested on Chrome, Firefox, and Edge (Safari support TBD)

**Tech Focus:** Persistent storage design, parameter schema validation, onboarding modals, accessibility best practices, Web Extensions store requirements.

**Deliverable:** A feature-complete, user-friendly tool ready for public release across browsers.

---

## Future Considerations (Post v1.0)

- Alternative context extraction: DOM chunks, semantic text sections.
- User-defined system prompts or LLM personas.
- PDF analysis via embedded viewers.
- Built-in prompt templates (summarize, explain code, etc.).
- Optional sync of settings/history (opt-in with external backend).
- Support for non-OpenAI APIs (Anthropic, Cohere, Mistral, etc.).
- Full Safari compatibility (extension conversion and testing).
- Plugin system for user-contributed extensions.

---

## Technology Stack

- **UI Framework:** Preact
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **APIs:** Web Extensions API (`browser.*` namespace)
  - `browser.commands`, `browser.storage`, `browser.runtime`, `browser.tabs.captureVisibleTab`, etc.
- **LLM Communication:** HTTP requests to user-provided OpenAI-compatible endpoints (e.g., OpenRouter)

---

## Contribution & Feedback

Sagelet is an open, evolving project. Contributions, feedback, and feature suggestions are encouraged. See [CONTRIBUTING.md](CONTRIBUTING.md) to get involved.
