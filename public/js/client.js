// client.js
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const serverUrl = document.body.getAttribute('data-server-url');
console.log(serverUrl)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
    <img src="./icons/user.png" alt="user icon"> <span>${userMessage}</span>
  </div>`;

  const response = await fetch('http://localhost:7104/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  const botMessage = data.message;

  messages.innerHTML += `<div class="message bot-message">
    <img src="./icons/chatbot.png" alt="bot icon"> <span>${botMessage}</span>
  </div>`;
});
