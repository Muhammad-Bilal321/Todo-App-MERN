const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
});

const TodoModel = mongoose.model("todoapp", TodoSchema);
module.exports = TodoModel;
