const express = require("express");
const mongoose = require("mongoose");
const UserModule = require("./modules/user.modules"); 

const app = express();
app.use(express.json());

const mongooseLink = "mongodb+srv://ameed:KbQeUfbptuiysONz@cluster0.macts0l.mongodb.net/";
mongoose.connect(mongooseLink);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

const createUser = (req, res) => {
  UserModule.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((response) => {
      res.status(200).json({
        message: "User created successfully",
      });
    })
    .catch((e) => {
      res.status(500).json({ message: "Error creating user" });
    });
};

app.post("/findUser", (req, res) => {
  UserModule.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: "Error finding user" });
    });
});

app.post("/createNewStudent", (req, res) => {
  StudentModule.create({
    name: req.body.name,
    id: req.body.id,
  })
    .then((response) => {
      res.status(200).json({
        message: "Student created successfully",
      });
    })
    .catch((e) => {
      res.status(500).json({ message: "Error creating student" });
    });
});

app.get("/getAllUsers", (req, res) => {
  StudentModule.find()
    .then((stRes) => {
      res.status(200).json({
        message: "done",
        users: stRes,
      });
    })
    .catch((e) => {
      res.status(500).json({ error: true, errorMessage: e });
    });
});

app.post('/getUserByName', (req, res) => {
  StudentModule.find({ name: req.body.name })
    .then(students => {
      res.status(200).json(students)
    })
    .catch(e => {
      res.status(500).json({ error: true, errorMessage: e });
    });
});

module.exports = app;

  