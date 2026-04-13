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


    // User look up

    lookUpUser(username) {

        // 1. Check existence

        if (!this.users[username]) {
            console.log(`Error: "${username} does not exist.`)
            return;
        } else {
            console.log(this.users[username]);
            return this.users[username];
        }
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

    // Find shortest path between users using BFS

    findShortestPath(userA, userB) {

        // 1. Check both users exist

        if (!this.users[userA] || !this.users[userB]) {
            console.log(`Error: One or both users do not exist.`);
            return;
        }

        // 2. Check not same user

        if (userA === userB) {
            console.log(`Error: You cannot find a path to yourself.`);
            return;
        }

        // 3. BFS setup -> Queue holds path

        const queue = [[userA]];
        const visited = new Set();
        visited.add(userA);


        // 4. BFS loop

        while (queue.length > 0) {

            const path = queue.shift();
            const current = path[path.length - 1];

            // 5. Check each neighbor of current node

            for (let neighbor of this.friends[current]) {

                if (!visited.has(neighbor)) {

                    const newPath = [...path, neighbor];

                    // 6. Found the target

                    if (neighbor === userB) {
                        console.log(`Shortest path: `, newPath);
                        return newPath;
                    }

                    visited.add(neighbor);
                    queue.push(newPath);
                }
            }
        }

        // 7. No path found
        console.log(`No connection found between ${userA} and ${userB}.`);
        return null;
    }

    // Suggest Friends

    suggestFriends(username) {

        // 1. Check user exists

        if (!this.users[username]) {
            console.log(`Error: This user does not exist.`);
            return;
        }

        // 2. Store suggestions in array

        const suggestions = [];

        // 3. Loop through user's friends (1 hop)

        for (let friend of this.friends[username]) {

            // 4. Loop through each freind's friends (2 hops)

            for (let friendOfFriend of this.friends[friend]) {

                // 5. Exclude initial user themselves

                if (username === friendOfFriend) {
                    continue;
                }

                // 6. Exclude friends of initial user

                if (this.friends[username].includes(friendOfFriend)) {
                    continue;
                }

                // 7. Add friends of friends to suggestions, excludiing duplicates

                if (!suggestions.includes(friendOfFriend)) {
                    suggestions.push(friendOfFriend);
                }

            }

        }

        console.log(`Friend Suggestions: `, suggestions);
        return suggestions;
    }

    // Print network using recursion and DFS

    printNetwork(username, visited = new Set(), depth = 0) {

        // 1. Check user exists

        if (!this.users[username]) {
            console.log(`Error: This user does not exist.`);
            return;
        }

        // 2. Base case (if already visited -> stop)

        if (visited.has(username)) return;

        // 3. Print header on first call only

        if (depth === 0) {
            console.log(`${username}'s network:`);
        }

        // 4. Mark as visited

        visited.add(username);

        // 5. Print current user with indentation

        const prefix = "-".repeat(depth);
        console.log(`${prefix}${username}`);

        // 6. Recursively call on each friend

        for (let friend of this.friends[username]) {
            this.printNetwork(friend, visited, depth + 1);
        }
    }
}

module.exports = SocialNetwork;