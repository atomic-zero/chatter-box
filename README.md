```markdown
# chat-box-ai

Interact with Chatterbox AI using this NPM package.

## Installation

```bash
npm install chat-box-ai
```

### To Chat With ChatterBox

```javascript
const { chatbox } = require('chat-box-ai');

const userId = 'userID'; // Replace with actual user ID
const query = 'How does nuclear fusion work?';

chatbox(userId, query)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
```

### To toggle websearch

```javascript
const { toggle } = require('chat-box-ai');

const message = toggle();
console.log(message);
```

### To Reset Conversation

```javascript
const { clear } = require('chat-box-ai');

const userId = 'user123'; // replace this according to userID you want to reset conversation.
const message = clear(userId);
console.log(message);
```
