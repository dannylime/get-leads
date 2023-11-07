const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LubelskieModel = require("./models/Lodzkie");
const path = require("path");
const rootEnvPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: rootEnvPath });

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI, // Use the MongoDB URL from the environment variables
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Route to update the "assignedTo" field
app.put("/updateAssignedTo/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { assignedTo } = req.body;

  try {
    const updatedUser = await LubelskieModel.findByIdAndUpdate(
      userId,
      { assignedTo },
      { new: true }
    );

    if (updatedUser) {
      return res.json({ success: true, user: updatedUser });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to update the "note" field
app.put("/updateNote/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { note } = req.body;

  try {
    const updatedUser = await LubelskieModel.findByIdAndUpdate(
      userId,
      { note },
      { new: true }
    );

    if (updatedUser) {
      return res.json({ success: true, user: updatedUser });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to fetch users
app.get("/getUsers", (req, res) => {
  LubelskieModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Listening on port: 3001");
});
