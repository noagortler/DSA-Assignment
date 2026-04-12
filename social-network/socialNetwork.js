// Stack Data Structure

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Queue Data Structure

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Social Network

class SocialNetwork {
    constructor() {
        this.users = {};
        this.friends = {};
    }

    // Add User

    addUser(firstName, lastName, username, password) {

        // 1. Block duplicate usernmaes

        if (this.users[username]) {
            console.log(`Error: username "${username}" is already taken.`);
            return;
        }

        // 2. Store the user 

        this.users[username] = {
            firstName,
            lastName,
            username,
            password,
            inbox: new Queue(),
            sentStack: new Stack()
        };

        // 3. Initialize users entry in the social network graph

        this.friends[username] = [];

        console.log(`Added user: ${username}`)

    }

    // Add Friends

    addFriendship(userA, userB) {

        // 1. Check both users exist

        if (!this.users[userA] || !this.users[userB]) {
            console.log(`Error: One or both users do not exist.`);
            return;
        }

        // 2. Check user is not self-friending

        if (userA === userB) {
            console.log(`Error: You cannot friend yourself.`);
            return;
        }

        // 3. Check users are not already friends

        if (this.friends[userA].includes(userB)) {
            console.log(`Error: ${userA} and ${userB} are already friends.`);
            return;
        }

        // 4. Initialize friendship

        this.friends[userA].push(userB);
        this.friends[userB].push(userA);

        console.log(`${userA} has successfully added ${userB}.`);
    }

    // Send Messages

    sendMessage(from, to, body) {

        // 1. Check existence

        if (!this.users[from] || !this.users[to]) {
            console.log(`Error: Message cannot be sent. One or both users do not exist.`);
            return;
        };

        // 2. Create message
        const message = {
            id: Date.now().toString(),
            from: from,
            to: to,
            body: body,
            timestamp: Date.now()
        };

        // 3. Send message (Push to senders sentStack, push to receivers inbox, send confirmation message)

        this.users[from].sentStack.push(message);
        this.users[to].inbox.enqueue(message);
        console.log(`Message "${body}" from ${from} sent to ${to}.`);
    }

    // Read next message in inbox

    readNextMessage(user) {

        // 1. Check existence

        if (!this.users[user]) {
            console.log(`Error: This user does not exist.`);
            return;
        }

        // 2. Check if inbox is empty

        const inbox = this.users[user].inbox;

        if (inbox.isEmpty()) {
            console.log(`You have no unread messages`);
            return;
        }

        // 3. Read message
        const message = inbox.dequeue()
        console.log(`New message from ${message.from}: "${message.body}"`)

    }

    // Undo last sent message

    undoLastSent(user) {

        // 1. Check existence

        if (!this.users[user]) {
            console.log(`Error: This user does not exist.`);
            return;
        }

        // 2. Check if sent stack is empty

        const sentStack = this.users[user].sentStack

        if (sentStack.isEmpty()) {
            console.log(`Your sent stack is empty.`);
            return;

        // 3. If sentStack is not empty, check message is still unread by receiver

        } else {

            const lastMessage = sentStack.pop();
            const receiver = this.users[lastMessage.to];
            const receiverInbox = this.users[lastMessage.to].inbox.items;
            let stillUnread = false;
            let messageIndex = -1;

            for (let i = 0; i < receiverInbox.length; i++) {
                if (receiverInbox[i].id === lastMessage.id) {
                    stillUnread = true;
                    messageIndex = i;
                    break;
                }
            }
        
        // 4. If still unread -> delete. If already read, cannot be unsent.

            if (stillUnread) {
                receiverInbox.splice(messageIndex, 1);
                console.log(`Your message to ${receiver.username} "${lastMessage.body}" has been successfully unsent.`);
                return;

            } else {
                console.log(`Your last message to ${receiver.username} has been read and cannot be unsent.`)
                return;
            }

        }
    }
}

module.exports = SocialNetwork;