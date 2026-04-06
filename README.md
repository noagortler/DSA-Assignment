# DSA Integration Assignment

## Mini Social Network

### Overview
A simplified social network that supports user registration, friendships, messaging, and friend suggestions to demonstrate understanding of algorithm and data structures logic.

---

### Data Structures Used

| Data Structure | Where | Why |
|---|---|---|
| Hash Table | `this.users` | O(1) user lookup by username. Faster than scanning an array. |
| Graph (adjacency list) | `this.friends` | Models relationships between users. Enables traversal for pathfinding and suggestions. |
| Queue | `this.inbox` per user | Incoming messages read in order received (FIFO). |
| Stack | `this.sentStack` per user | Tracks sent messages so the most recent one can be undone (LIFO). |

---

### Methods

#### `addUser(firstName, lastName, username, email, password)`
- Creates a new user and stores them in the hash table
- User object: `{ firstName, lastName, username, email, password }`
- Each user also gets an empty inbox (queue) and empty sentStack
- **Edge cases handled:**
  - Duplicate username → error message
  - Duplicate email → error message

#### `addFriendship(userA, userB)`
- Connects two users with an undirected edge in the adjacency list
- Both users are added to each other's friends list
- **Edge cases handled:**
  - One or both users don't exist → error message
  - Users are already friends → error message
  - A user attempting to friend themselves → error message

#### `sendMessage(from, to, body)`
- Creates a message object: `{ id, from, to, body, timestamp }`
- Pushes message into the **receiver's inbox queue**
- Pushes message onto the **sender's sentStack**
- **Edge cases handled:**
  - Sender or receiver doesn't exist → error message

#### `readNextMessage(username)`
- Removes and returns the oldest message from a user's inbox (front of queue)
- **Edge cases handled:**
  - Inbox is empty → returns a message saying so

#### `undoLastSent(username)`
- Pops the most recent message off the sender's sentStack
- If that message is still unread in the receiver's inbox → removes it from their inbox
- If the message has already been read → cannot undo, returns a message saying so

#### `findShortestPath(userA, userB)`
- Uses **BFS** to find the shortest chain of connections between two users
- Returns an array of usernames representing the path
- Example: `["alice99", "bob42", "carol33"]`
- **Why BFS?** BFS explores level by level, so the first time it reaches the target it is guaranteed to be via the shortest path. DFS would find a path but not necessarily the shortest one.
- **Edge cases handled:**
  - One or both users don't exist → error message
  - No path exists between them → returns message saying so

#### `suggestFriends(username)`
- Uses **BFS** to find all users exactly 2 hops away (friends of friends)
- Excludes users who are already friends with the given user
- Excludes the user themselves
- Returns a list of suggested usernames
- **Edge cases handled:**
  - User doesn't exist → error message
  - No suggestions found → returns empty array

---

### Where Traversal is Used
- **BFS** in `findShortestPath()` — shortest chain of connections between two users
- **BFS** in `suggestFriends()` — friends-of-friends not yet connected

### Where Recursion is Used
- *(To be confirmed during implementation)*
