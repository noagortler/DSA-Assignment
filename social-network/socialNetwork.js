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
}

module.exports = SocialNetwork;