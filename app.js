const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const port = 3000; // Choose a port number
const secretKey =
  "eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4OTY2NzA5OCwiaWF0IjoxNjg5NjY3MDk4fQ.bw3kgz10MlOyS6WClPLUIHmX0RebDJTw5sfFCpFFrOk2HnFxwj1IyIMYw7hrh_Jq1OmuuRpi2z0mHZm-4uQQgg";

let users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// Middleware to parse JSON requests
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Set the decoded user data in the request object, so the user can access to the given middleware
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Generate a JWT for a given user
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "10m",
  });
};

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are valid
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT token for the authenticated user
  const token = generateToken(user);
  console.log(token);
  res.json({ token });
});

// function to find user index
const findUserIndex = (users, id) => {
  return users.findIndex((user) => user.id === id);
};

// GET all users
app.get("/users", verifyToken, (req, res) => {
  res.json(users);
});

// GET user by ID
app.get("/users/:id", verifyToken, (req, res) => {
  const userId = +req.params.id;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

// Add a new user
app.post("/users", verifyToken, (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  console.log(users);
  res.status(201).json(newUser);
});

// Update user
app.post("/users/:id", verifyToken, (req, res) => {
  const userId = +req.params.id;
  const updatedUser = req.body;

  const userIndex = findUserIndex(users, userId);

  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
  } else {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    console.log(users);
    res.json(users[userIndex]);
  }
});

// DELETE user
app.delete("/users/:id", verifyToken, (req, res) => {
  const userId = +req.params.id;
  const userIndex = findUserIndex(users, userId);

  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
  } else {
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    console.log(users);
    res.json(deletedUser);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
