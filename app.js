const SocialNetwork = require('./social-network/socialNetwork')

const network = new SocialNetwork();

console.log("=== MINI SOCIAL NETWORK ===")

// Adding Users

console.log("--- Adding Users ---")
network.addUser("Felix", "Kitty", "felix123", "abc123");
network.addUser("Ruby", "Kitty", "rubycat", "123abc");
network.addUser("Felix", "Cat", "felix123", "ruby123");