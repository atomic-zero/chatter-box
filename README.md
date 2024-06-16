```markdown
# chatter-box

Interact with Chatterbox AI using this NPM package.

## Installation

```bash
npm install chatter-box
```

### To Chat With ChatterBox

```javascript
const { chatbox } = require('chatter-box');

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
const { toggle } = require('chatter-box');

const message = toggle();
console.log(message);
```

### To Reset Conversation

```javascript
const { clear } = require('chatter-box');

const userId = 'user123'; // replace this according to userID you want to reset conversation.
const message = clear(userId);
console.log(message);
```
