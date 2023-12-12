const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Model/taskModel");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Use a connection string with database name
mongoose.connect("mongodb://127.0.0.1:27017/todo-task");

app.post("/add", function (req, res) {
  let task = req.body.task;

  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate({ _id: id }, { task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
