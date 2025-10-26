
export class ChatView extends HTMLElement {
    /**
     * Constructor: attaches a Shadow DOM to encapsulate styles and markup.
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Called when the element is added to the DOM.
     * Sets up the Shadow DOM structure, styles, and initial event listeners.
     */
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --primary-color: #4a90e2;
                    --bot-bubble: #d7d9e1;
                    --grey: #888;
                    --page-background: #6970d6;
                    --white: #ffffff;
                    --bot-text-color: #333;
                    --user-text-color: #ffffff;
                    --warning-color: #f7e985;
                    --warning-text-color: #523003;
                    --font-family: 'Inter', sans-serif;
                    --font-size-base: 16px;
                    --spacing-base: 1.25rem;
                    --border-radius: 16px;
                    --margin-base: 3rem;

                    display: flex;
                    height: 100%;
                    width: 100%;
                    background-color: var(--page-background);
                    font-family: var(--font-family);
                }

                container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    min-height: 100vh;
                    max-height: 90vh;
                }

                header {
                    background-color: var(--primary-color);
                    color: var(--white);
                    flex-shrink: 0;
                    padding: var(--spacing-base);
                    border-top-left-radius: var(--border-radius);
                    border-top-right-radius: var(--border-radius);
                    text-align: center;
                    margin-top: var(--margin-base);
                    margin-left: var(--margin-base);
                    margin-right: var(--margin-base);
                }

                header h1 {
                    font-size: 2rem;
                    margin: 0;
                    font-weight: 600;
                }

                header p {
                    font-size: 0.8rem;
                    margin: 0;
                    margin-top: 0.5rem;
                }

                main {
                    background-color: var(--white);
                    display: flex;
                    flex-direction: column;
                    padding: var(--spacing-base);
                    margin-left: var(--margin-base);
                    margin-right: var(--margin-base);
                    max-height: calc(100vh - 200px);
                    overflow: hidden;
                    height: 100dvh;
                    flex: 1;
                }

                .message-history {
                    flex: 1;
                    overflow-y: auto;
                    margin-bottom: var(--spacing-base);
                    padding-right: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    scroll-behavior: smooth;
                    min-height: 60px;
                }

                .message {
                    max-width: 70%;
                    padding: 8px 12px;
                    border-radius: var(--border-radius);
                    word-wrap: break-word;
                }

                    .message-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 4px;
                    }

                    .avatar {
                        font-size: 1.2rem;
                    }

                    .timestamp {
                        font-size: 0.75rem;
                        color: var(--grey);
                    }

                    .message-content p{
                        display: inline-block;
                        margin: 0;
                        padding: 8px 12px;
                        font-size: 1rem;
                        border-radius: var(--border-radius);
                        word-wrap: break-word;
                        max-width: 100%;
                    }

                    .bot-message {
                        align-self: flex-start;
                    }

                    .user-message {
                        align-self: flex-end;
                        width: fit-content;
                    }

                    .user-message .message-content {
                        background-color: var(--primary-color);
                        color: var(--user-text-color);
                        border-bottom-right-radius: 4px;
                        border-bottom-left-radius: var(--border-radius);
                        border-top-right-radius: var(--border-radius);
                        border-top-left-radius: var(--border-radius);
                    }

                    .bot-message .message-content {
                        background-color: var(--bot-bubble);
                        color: var(--bot-text-color);
                        border-bottom-left-radius: 4px;
                        border-bottom-right-radius: var(--border-radius);
                        border-top-left-radius: var(--border-radius);
                        border-top-right-radius: var(--border-radius);
                    }

                    .message-content {
                        position: relative;
                        transition: all 0.3s ease;
                    }

                    .message-actions {
                        opacity: 0;
                        max-height: 0;
                        overflow: hidden;
                        transition: all 0.3s ease;
                    }

                    .user-message:hover .message-actions {
                        opacity: 1;
                        max-height: 50px;
                    }

                    .message-actions button {
                        border: none;
                        cursor: pointer;
                        font-size: 0.8rem;
                        padding: 2px 4px;
                        transition: color 0.2s ease;
                        border-radius: 10px;
                    }

                    .edit-btn {
                        color: var(--primary-color);
                    }
                    
                    .delete-btn {
                        color: red;
                    }

                #chat-input-area {
                    display: flex;
                    gap: 10px;
                    margin-top: var(--spacing-base);
                    margin-bottom: var(--spacing-base);
                }

                    #chat-input-area input {
                        flex: 1;
                        padding: 10px;
                        font-size: 1rem;
                        border: 1px solid var(--grey);
                        border-radius: var(--border-radius);
                    }

                    #chat-input-area button {
                        background-color: var(--bot-bubble);
                        color: var(--white);
                        border: none;
                        padding: 10px 20px;
                        font-size: 1rem;
                        border-radius: var(--border-radius);
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }

                    #chat-input-area button:hover {
                        background-color: var(--primary-color);
                    }

                    @media (max-width: 480px) {
                        #chat-input-area {
                            gap: 6px;
                            padding: 0 4px;
                        }

                        #chat-input-area input {
                            font-size: 0.9rem;
                            padding: 8px;
                        }

                        #chat-input-area button {
                            padding: 8px 12px;
                            font-size: 0.9rem;
                        }
                    }

                chat-footer {
                    background-color: var(--bot-bubble);
                    color: var(--warning-text-color);
                    padding: var(--spacing-base);
                    border-bottom-left-radius: var(--border-radius);
                    border-bottom-right-radius: var(--border-radius);
                    text-align: center;

                    margin-left: var(--margin-base);
                    margin-right: var(--margin-base);
                    margin-bottom: var(--margin-base);
                }

                chat-footer button {
                    font-size: 1rem;
                    border-radius: 10px;
                    padding: 4px;
                    border: none;
                    margin: 4px;
                }

                .clear-button {
                    transition: background-color 0.6s ease;
                }
                .clear-button:hover {
                    background-color: red;
                }

                .import-button {
                    transition: background-color 0.6s ease;
                }
                .import-button:hover {
                    background-color: var(--primary-color);
                }

                .export-button {
                    transition: background-color 0.6s ease;
                }
                .export-button:hover {
                    background-color: var(--primary-color);
                }

                #message-count {
                    font-size: 0.9rem;
                    color: var(--white);
                    background-color: var(--primary-color);
                    padding: 6px;
                }

            </style>

            <container>
                <header id="chat-header">
                    <h1>Chat Application</h1>
                    <p>MVC Architecture with CRUD Operations</p>
                </header>

                <main>
                    <section id="chat-window" class="message-history">
                    </section>
                    <form id="chat-input-area">
                        <input id="message-box" type="text" placeholder="Type your message...">
                        <button id="send-button" type="button">Send</button>
                    </form>
                </main>

                <chat-footer>
                    <button class="clear-button" type="button">🗑️Clear All</button>
                    <button class="import-button" type="button">📥Import Chat</button>
                    <button class="export-button" type="button">📤Export Chat</button>
                    <span id="message-count">Messages: 0</span>
                </chat-footer>
            </container>
        `;
        document.body.style.margin = '0'; // Remove default margin
        this.setupEventListeners();
    }

    /**
     * Sets up event listeners for sending messages via button click or Enter key.
     */
    setupEventListeners() { 
        const sendButton = this.shadowRoot.getElementById('send-button');
        this.messageBox = this.shadowRoot.getElementById('message-box');
        this.chatWindow = this.shadowRoot.getElementById('chat-window');
        const footer = this.shadowRoot.querySelector('chat-footer');

        // Store handlers as properties so they can be removed later
        this._sendHandler = () => {
            const text = this.messageBox.value.trim();
            if (!text) return;
            this.dispatchEvent(new CustomEvent('message-send', { detail: text }));
            this.messageBox.value = '';
            this.messageBox.focus();
        };

        this._keypressHandler = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this._sendHandler();
            }
        };

        this._chatClickHandler = (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const id = e.target.dataset.id;
                this.dispatchEvent(new CustomEvent('message-edit', { detail: { id } }));
            } else if (e.target.classList.contains('delete-btn')) {
                const id = e.target.dataset.id;
                this.dispatchEvent(new CustomEvent('message-delete', { detail: { id } }));
            }
        };

        this._footerClickHandler = (e) => {
            if (e.target.classList.contains('clear-button')) {
                this.dispatchEvent(new CustomEvent('chat-clear'));
            } else if (e.target.classList.contains('import-button')) {
                this.dispatchEvent(new CustomEvent('chat-import'));
            } else if (e.target.classList.contains('export-button')) {
                this.dispatchEvent(new CustomEvent('chat-export'));
            }
        };

        // Attach all listeners
        sendButton.addEventListener('click', this._sendHandler);
        this.messageBox.addEventListener('keypress', this._keypressHandler);
        this.chatWindow.addEventListener('click', this._chatClickHandler);
        footer.addEventListener('click', this._footerClickHandler);

        this.messageBox.focus();
    }

    /**
    * Renders a single chat message in the chat window.
    * @param {Object} message - The message object to render.
        * @param {string} message.id - Unique message ID.
        * @param {string} message.text - Message text content.
        * @param {string} message.sender - Either 'user' or 'bot'.
        * @param {number} message.timestamp - Time the message was created (ms).
        * @param {boolean} [message.edited=false] - Whether the message was edited.
    */
    renderMessage({id, text, sender, timestamp, edited}) {
        const isUser = sender === 'user';
        const avatar = isUser ? '👤' : '🤖'; // Use Profile if isUser is true, else use Robot
        const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        msgDiv.dataset.id = id;
        msgDiv.innerHTML = `
            <div class="message-header">
                <span class="avatar">${avatar}</span>
                <span class="timestamp">${timeString}${edited ?  ' • edited' : ''}</span>
            </div>
            <div class="message-content">
                <p>${text}</p>
                ${isUser ? `
                    <div class = "message-actions">
                        <button class="edit-btn" data-id="${id}"> Edit</button>
                        <button class="delete-btn" data-id="${id}"> Delete</button>
                    </div>
                ` : ''}
            </div>
        `;

        this.chatWindow.appendChild(msgDiv);
        this.chatWindow.scrollTo({
            top: this.chatWindow.scrollHeight,
            behavior: 'smooth'
        });
    }

    /**
     * Renders all messages in the chat window.
     * @param {Array<Object>} messages - List of message objects to display.
     */
    renderMessages(messages) {
        this.chatWindow.innerHTML = '';
        messages.forEach(msg => this.renderMessage(msg)); // Calls renderMessage for each message
    }

    /**
     * Cleans up event listeners when element is removed from DOM (prevents memory leaks)
     */
    disconnectedCallback() {
        const sendButton = this.shadowRoot.getElementById('send-button');
        const footer = this.shadowRoot.querySelector('chat-footer');

        if (sendButton) sendButton.removeEventListener('click', this._sendHandler);
        if (this.messageBox) this.messageBox.removeEventListener('keypress', this._keypressHandler);
        if (this.chatWindow) this.chatWindow.removeEventListener('click', this._chatClickHandler);
        if (footer) footer.removeEventListener('click', this._footerClickHandler);
    }
}

// Registers the ChatView custom element with the browser
customElements.define('chat-view', ChatView);