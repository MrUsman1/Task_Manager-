const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'StyleSense';

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Check if email already exists
    const existingUser = await usersCollection.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUser = await usersCollection.insertOne({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully.",
      userId: newUser.insertedId.toString()
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering the user." });
  } finally {
    await client.close();
  }
});

// Endpoint to fetch all users
app.get('/admin/users', async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users." });
  } finally {
    await client.close();
  }
});

// Endpoint to delete a user
app.delete('/admin/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({ _id: userId });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
