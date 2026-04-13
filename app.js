const SocialNetwork = require('./social-network/socialNetwork');

const network = new SocialNetwork();

console.log("=== MINI SOCIAL NETWORK ===");

// Adding Users

console.log("--- Adding Users ---");
network.addUser("Felix", "Kitty", "felix123", "abc123");
network.addUser("Ruby", "Kitty", "rubycat", "123abc");
network.addUser("Felix", "Cat", "felix123", "ruby123"); // duplicate username test

// User Lookup
console.log("--- User Lookup ---");
network.lookUpUser("felix123");
network.lookUpUser("oscar123"); // non-existent user test

// Adding Friendships

console.log("--- Adding Friendships ---");
network.addFriendship("felix123", "rubycat");
network.addFriendship("felix123", "oscar123"); // non-existent user test
network.addFriendship("felix123", "felix123"); // self-friending test
network.addFriendship("felix123", "rubycat"); // pre-existing friendship test

// Sending Messages

console.log("--- Sending Messages ---");
network.sendMessage("felix123", "rubycat", "Hey Ruby!");
network.sendMessage("rubycat", "felix123", "Hey Felix!");
network.sendMessage("felix123", "oscar123", "This should fail."); // non-existent user test

console.log("--- Checking Inbox and SentStack ---");
console.log("rubycat's inbox:", network.users["rubycat"].inbox);
console.log("felix123's sentStack:", network.users["felix123"].sentStack);

// Reading Messages

console.log("--- Reading Messages ---");
network.readNextMessage("rubycat");         // read Felix's message to Ruby
network.readNextMessage("rubycat");         // no unread messages
network.readNextMessage("oscar123");        // non-existent user test

// Undo Last Sent

console.log("--- Undo Last Sent ---");
network.sendMessage("felix123", "rubycat", "Unsend this message");
network.undoLastSent("felix123");  // unsend message
network.undoLastSent("felix123");  // sentStack empty test

// Shortest Path

console.log("--- Shortest Path ---");
network.addUser("Peter", "Pan", "peterpan", "abc123");
network.addUser("Tinker", "Bell", "tinkerbell", "abc123");
network.addFriendship("rubycat", "peterpan");
network.addFriendship("peterpan", "tinkerbell");
network.findShortestPath("felix123", "tinkerbell");
network.findShortestPath("felix123", "felix123"); // same user test
network.findShortestPath("felix123", "oscar123"); // non-existent user test

// Suggest Friends

console.log("--- Suggest Friends ---");
network.suggestFriends("felix123");
network.suggestFriends("oscar123"); // non-existent user test

// Print Network
console.log("--- Print Network ---");
network.printNetwork("felix123");
network.printNetwork("ghost999"); // non-existent user test