# Chat Interface With Real AI API

## Task
Build a **chat interface** with Groq API integration based on the following requirements:

## Specifications
### Core Features

- Create a modern chat UI with:
  - A scrollable conversation area that displays the **full message history**
  - User messages on the right, AI responses on the left
  - A message input field at the bottom with a Send button
  - Support for pressing Enter to send (with Shift+Enter for new line)

- Use **React functional components** with hooks only:
  - `useState` for managing:
    - `messages` array (full conversation history)
    - `input` value
    - `isLoading` state
  - `useEffect` for loading/saving to localStorage

### API Integration (Critical)

- Use **Llama 3** model via Groq API (`https://api.groq.com/openai/v1/chat/completions`)
- **Must use native `fetch`** — no SDKs or third-party libraries
- Set headers manually:
  - `Authorization: Bearer ${NEXT_PUBLIC_GROK_API_KEY}`
  - `Content-Type: application/json`
- Send the **entire message history** on every request (full context)
- Handle the request with `async/await`
- Show "Thinking..." or loading indicator while waiting for response
- Properly handle and display errors (non-2xx responses) with user-friendly messages

### Token Usage & Metrics Panel

Create a clean sidebar or top panel showing real-time metrics:
- Running total of **prompt tokens** used in the session
- Running total of **completion tokens** received
- **Total tokens** consumed
- At least **one additional metric** (model name, response time, or tokens/second)

After each successful API response, parse the `usage` object and accumulate the totals.

### Session Persistence

- On component mount, load conversation history from `localStorage`
- After every new message (user + AI), save the full history to `localStorage`
- Add a **"Clear Conversation"** button that:
  - Clears the messages state
  - Removes the data from localStorage
