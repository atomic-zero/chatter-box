```markdown
# chatbox-dev-ai

Interact with Chatterbox AI using this NPM package.

## Installation

```bash
npm install chatbox-dev-ai
```

### To Chat With ChatterBox

```javascript
const { chatbox } = require('chatbox-dev-ai');

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
const { toggle } = require('chatbox-dev-ai');

const message = toggle();
console.log(message);
```

### To Reset Conversation

```javascript
const { clear } = require('chatbox-dev-ai');

const userId = 'user123'; // replace this according to userID you want to reset conversation.
const message = clear(userId);
console.log(message);
```
