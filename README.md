# Chat App + AI Services (MVC Architecture)

A modular, interactive chat application built using the **Model-View-Controller (MVC)** pattern and enhanced with **AI-powered responses** via **Netlify Functions**.  
Users can send, edit, delete, clear, and import/export chat histories — all stored locally for persistence between sessions.

---

## AI Research & Selection

Before implementing the AI integration, I researched several popular APIs and language models, including **OpenAI’s ChatGPT**, **Anthropic’s Claude**, and **Google’s Gemini**.  
After comparing their documentation, ease of access, and cost, I ultimately chose **Google Gemini** because:

- It was **free to use** and easy to set up for student projects.  
- The **API key** was straightforward to obtain through Google’s AI Studio.  
- Google’s **official documentation** provided clear examples and implementation details for JavaScript-based projects.  

This made Gemini a great fit for integrating AI-generated responses into the chat app using **Netlify Functions**.

---

## Live Demo
[**View the app on Netlify →**](https://lab8chatapp.netlify.app/)

---

## Project Structure
```
lab8-ai-services/
├── .github/
│ └── workflows/
│ └── playwright.yml
│
├── .netlify/
│
├── js/
│ ├── aiManager.js
│ ├── app.js
│ ├── controller.js
│ ├── eliza.js
│ ├── model.js
│ └── view.js
│
├── netlify/
│ └── functions/
│ └── gemini.js
│
├── node_modules/
│
├── playwright-report/
│ └── index.html
│
├── test-results/
│ └── .last-run.json
│
├── tests/
│ └── netlify.test.js
│
├── .env
├── .gitignore
├── index.html
├── LICENSE
├── netlify.toml
├── package.json
├── package-lock.json
├── playwright.config.js
├── README.md
```


---

## How to Use

1. **Type a message** in the input box and hit Enter or click Send.  
2. The **bot** replies using either:
   - **Eliza.js:** deterministic, rule-based responses, or  
   - **Gemini AI (Netlify Function):** intelligent responses powered by an AI API.  
3. Hover over your messages to reveal **Edit** and **Delete** options.  
4. Footer buttons let you:
   - **Clear All** — wipes all messages  
   - **Export** — downloads chat history as JSON  
   - **Import** — loads a saved chat file  

All messages persist via `localStorage`.

---

## MVC Architecture Overview

### **Model (`model.js`)**
- Manages message storage in memory and `localStorage`
- Supports CRUD operations and JSON import/export

### **View (`view.js`)**
- Renders messages, timestamps, and buttons  
- Handles user-triggered events and dispatches actions

### **Controller (`controller.js`)**
- Syncs model and view  
- Handles user actions, bot responses, and file imports/exports

### **AI Integration**
- **`aiManager.js`** — Handles requests to the AI service  
- **`netlify/functions/gemini.js`** — Serverless function that connects to an external AI API (e.g., Google Gemini)

---

## Testing & Deployment

### **Playwright**
- End-to-end browser testing  
- Configured via `.github/workflows/playwright.yml` for automated CI/CD  
- Generates reports in `playwright-report/`

Run tests locally:
```bash
npx playwright test
```

--- 
## Netlify

- Deploys automatically via netlify.toml
- Serverless functions live under netlify/functions/

Deploy manually:
```
netlify deploy --prod
```

## Privacy Discussion
- Stored Gemini API key in a `.env` file and added it to `.gitignore`
- Accessed API key in `netlify/functions/gemini.js` with `process.env.GEMINI_API_KEY`

## Future Improvements

- Real-time WebSocket backend for multi-user chat
- Enhanced AI models with contextual memory
- Mobile-first redesign and animations
- Chat search feature
- Voice-based input/output

## License

Licensed under the MIT License — see [LICENSE.md](LICENSE.md) 
 for details.

## Author

Tyler Hayes

Built to explore MVC design, AI integration, Web Components, and automated testing.
