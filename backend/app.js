const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const PORT = 5000;
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/todo", (err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const ToDoSchema = new mongoose.Schema({
  rank: Number,
  description: String,
  createAt: { type: Date, default: Date.now() },
});

const toDo = mongoose.model("Item", ToDoSchema);

//Create To-Do
app.post("/api/items", (req, res) => {
  const { rank, description, createdBy } = req.body;

  var toDoAdd = new toDo({
    rank: rank,
    description: description,
    createdBy: createdBy,
  });

  toDoAdd.save((err, todo) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(201).json({
        message: "To-Do has been created",
        todo,
      });
    }
  });
});

//View To-Do
app.get("/api/items", (req, res) => {
  toDo.find({}, (err, toDos) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: "All ToDos",
        toDos,
      });
    }
  });
});

//Update Single To-Do
app.patch("/api/items/:todo_id", (req, res) => {
  const { todo_id } = req.params;

  const { rank, description, createdBy } = req.body;

  toDo.findByIdAndUpdate(
    todo_id,
    {
      rank: rank,
      description: description,
      createdBy: createdBy,
    },
    (err, toDo) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else {
        res.status(200).json({
          message: "To-Do updated",
          toDo,
        });
      }
    }
  );
});

//Remove Single To-Do
app.delete("/api/items/:todo_id", (req, res) => {
  const { todo_id } = req.params;

  toDo.findByIdAndDelete(todo_id, (err, toDo) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: "To-Do has been removed",
        toDo,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});
