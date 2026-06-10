// Ask tab — chat with Claude via /api/chat, persist to Supabase
let chatHistory = [];
let currentThreadId = localStorage.getItem('architect-thread-id') || null;

function focusChatInput() {
  const el = document.getElementById('chat-input');
  if (el && document.getElementById('chat-messages').children.length === 0) {
    loadConversationHistory();
  }
  setTimeout(() => el?.focus(), 100);
}

function askQuick(text) {
  const input = document.getElementById('chat-input');
  input.value = text;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  autoResize(input);
  addUserMessage(text);
  chatHistory.push({ role: 'user', content: text });

  const sendBtn = document.getElementById('chat-send');
  sendBtn.disabled = true;
  const thinking = addThinking();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chatHistory,
        threadId: currentThreadId,
        localDate: new Date().toISOString(),
      }),
    });
    thinking.remove();
    if (!res.ok) {
      const err = await res.text();
      addErrorMessage('The Architect is silent — ' + (err || res.status));
      return;
    }
    const data = await res.json();
    currentThreadId = data.threadId;
    localStorage.setItem('architect-thread-id', currentThreadId);
    const reply = data.reply || '(no response)';
    chatHistory.push({ role: 'assistant', content: reply });
    addAssistantMessage(reply);
  } catch (e) {
    thinking.remove();
    addErrorMessage('Network or backend not reachable. ' + e.message);
  } finally {
    sendBtn.disabled = false;
  }
}

async function loadConversationHistory() {
  if (!currentThreadId) return; // New conversation
  try {
    const res = await fetch(`/api/conversations?threadId=${currentThreadId}`);
    if (!res.ok) return;
    const { messages } = await res.json();
    chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
    const wrap = document.getElementById('chat-messages');
    wrap.innerHTML = '';
    for (const msg of messages) {
      if (msg.role === 'user') addUserMessage(msg.content);
      else addAssistantMessage(msg.content);
    }
  } catch {}
}

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.textContent = text;
  appendMsg(div);
}

function addAssistantMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg assistant';
  div.innerHTML = renderMarkdownLite(text);
  appendMsg(div);
}

function addThinking() {
  const div = document.createElement('div');
  div.className = 'chat-msg thinking';
  div.textContent = 'Consulting the codex…';
  appendMsg(div);
  return div;
}

function addErrorMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg error';
  div.textContent = text;
  appendMsg(div);
}

function appendMsg(div) {
  const wrap = document.getElementById('chat-messages');
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function renderMarkdownLite(s) {
  return escapeHTML(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chat-input');
  if (!input) return;
  input.addEventListener('input', () => autoResize(input));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChat();
    }
  });
});
