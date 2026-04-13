# DSA Integration Assignment

## Mini Social Network

### Overview
A simplified social network that supports user registration, friendships, messaging, and friend suggestions to demonstrate understanding of algorithm and data structures logic.

---
 
### How to Run
 
1. Make sure you have [Node.js] installed
2. Clone the repository
3. Navigate to the project folder:

   ```
   cd dsa-assignment
   ```
4. Run the demo:

   ```
   node app.js
   ```
 
---

### Data Structures Used

| Data Structure | Where | Why |
|---|---|---|
| Hash Table | `this.users` | O(1) user lookup by username. Faster than scanning an array. |
| Graph (adjacency list) | `this.friends` | Models relationships between users. Enables traversal for pathfinding and suggestions. |
| Queue | `inbox` per user | Incoming messages read in order received (FIFO). |
| Stack | `sentStack` per user | Tracks sent messages so the most recent one can be undone (LIFO). |


### Algorithms Used
| Algorithm | Where | Why |
|---|---|---|
| BFS | `findShortestPath()`, `suggestFriends()` | Explores level by level, guarantees shortest path |
| DFS | `printNetwork()` | Naturally fits recursive network traversal |
| Recursion | `printNetwork()` | Elegantly traverses the friend network depth-first |

---

### Methods

#### `addUser(firstName, lastName, username, email, password)`
- Creates a new user and stores them in the hash table
- User object: `{firstName, lastName, username, password, inbox, sentStack}`
- Each user also gets an empty inbox (queue) and empty sentStack
- **Edge cases handled:**
  - Duplicate username -> error message

#### `lookUpUser(username)`
- Looks up a user in the hash table by username
- Returns a safe profile object excluding sensitive fields
**Edge cases hendled:**
  - User doesn't exist -> error message

#### `addFriendship(userA, userB)`
- Connects two users with an undirected edge in the adjacency list
- Both users are added to each other's friends list
- **Edge cases handled:**
  - One or both users don't exist -> error message
  - A user attempting to friend themselves -> error message
  - Users are already friends -> error message  

#### `sendMessage(from, to, body)`
- Creates a message object: `{id, from, to, body, timestamp}`
- Pushes message into the **receiver's inbox queue**
- Pushes message onto the **sender's sentStack**
- **Edge cases handled:**
  - Sender or receiver doesn't exist -> error message

#### `readNextMessage(username)`
- Dequeues and returns the oldest message from a user's inbox (front of queue)
- **Edge cases handled:**
  - Inbox is empty -> returns a message saying so
  - User doesn't exist -> error message

#### `undoLastSent(username)`
- Pops the most recent message off the sender's sentStack
- If that message is still unread in the receiver's inbox -> removes it from their inbox
- If the message has already been read -> cannot undo, returns a message saying so
- **Edge cases handled:**
  - Inbox is empty -> returns a message saying so
  - User doesn't exist -> error message

#### `findShortestPath(userA, userB)`
- Uses **BFS** to find the shortest chain of connections between two users
- Queue holds full paths so complete route is available when the target is found
- Returns an array of usernames representing the path
- Example: `["felix", "ruby", "peterpan"]`
- **Why BFS over DFS?** BFS explores level by level, so the first time it reaches the target it is guaranteed to be via the shortest path. DFS would find a path but not necessarily the shortest one.
- **Edge cases handled:**
  - One or both users don't exist -> error message
  - Same user -> error message
  - No path exists between them -> returns message saying so

#### `suggestFriends(username)`
- Uses **BFS** to find all users exactly 2 hops away (friends of friends)
- Excludes users who are already friends with the given user
- Excludes the user themselves
- Excludes duplicates
- Returns a list of suggested usernames
- **Edge cases handled:**
  - User doesn't exist -> error message
  - No suggestions found -> returns empty array
  
#### `printNetwork(username)`
- Recursively prints a user's full friend network using DFS
- Uses depth to indent each level of connections
- Uses a visited Set to prevent infinite loops
- **Edge cases handled:**
  - User doesn't exist -> error message

---

### Where Traversal is Used
- **BFS** in `findShortestPath()` - shortest chain of connections between two users
- **BFS** in `suggestFriends()` - friends-of-friends not yet connected
- **DFS** in `printNetwork()` - recursively visits each friend and their friends depth-first

### Where Recursion is Used
- **Recurusion** In `printNetwork()` - recursively visits each friend and their friends, printing the network as a tree.
  - Added printNetwork in order to ensure recursion criteria was met as I did not feel it was an efficient solution for the other methods in this option, so it was intentionally applied here where it fits cleanly.

---

### One Challenge Faced
The biggest challenge I faced was in `findShortestPath()`. I understood how BFS worked from class, but I could not figure out how to return the full path instead of just the individual nodes. In the class examples, the queue held single nodes and we just printed each one as we visited it. But for this method I needed to return the complete chain of users from A to B. This concept took me a while to grasp, but eventually worked out that storing full paths in the queue instead of individual nodes was the solution. Each time we visit a neighbor we build a new array that copies the current path and adds the neighbor to the end. When we finally reach the target, the complete path is right there in the array we are already holding.