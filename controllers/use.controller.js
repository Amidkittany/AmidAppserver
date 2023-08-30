const StudentModule = require("../modules/student.modules");

const StudentModule = require(StudentModule)
exports.createUser = (req, res) => {
  StudentModule.create({
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
const findUser = (req, res) => {
  StudentModule.findOne({ username: req.body.username })
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
};

module.exports = findUser;