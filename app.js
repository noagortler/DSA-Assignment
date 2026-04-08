const SocialNetwork = require('./social-network/socialNetwork');

const network = new SocialNetwork();

console.log("=== MINI SOCIAL NETWORK ===");

// Adding Users

console.log("--- Adding Users ---");
network.addUser("Felix", "Kitty", "felix123", "abc123");
network.addUser("Ruby", "Kitty", "rubycat", "123abc");
network.addUser("Felix", "Cat", "felix123", "ruby123"); // duplicate username test

// Adding Friendships

console.log("--- Adding Friendships ---");
network.addFriendship("felix123", "rubycat");
network.addFriendship("felix123", "oscar123"); // non-existent user test
network.addFriendship("felix123", "felix123"); // self-friending test
network.addFriendship("felix123", "rubycat"); // pre-existing friendship test