```markdown
# chatbox-dev-ai

Interact with HAJI-CHATBOX (Unlimited) AI no need api-key!.

## Installation

```bash
npm install chatbox-dev-ai
```

### To Chat With HAJI-CHATBOX

```javascript
const { chatbox } = require('chatbox-dev-ai');

const userId = 'default';
const query = 'how to look attractive?';

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

### To toggle code model

```javascript
const { code } = require('chatbox-dev-ai');

const message = code();
console.log(message);
```

### To Reset Conversation

```javascript
const { clear } = require('chatbox-dev-ai');

const userId = 'default';
const message = clear(userId);
console.log(message);
```
