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
            inbox: [],
            sentStack: []
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

        if(!this.users[from] || !this.users[to]) {
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
        this.users[to].inbox.push(message);
        console.log(`Message sent ${from} to ${to}.`);
    }
}

module.exports = SocialNetwork;