import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
} from "@mui/material";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    const updateTask = prompt("Update Task", "");
    if (updateTask !== null) {
      axios
        .put(`http://localhost:3001/update/${id}`, { task: updateTask })
        .then((result) => {
          console.log(result);

          axios
            .get("http://localhost:3001/get")
            .then((result) => setTodos(result.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((result) => {
        console.log(result);
        window.location.reload(); // Reload the page
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <h1 className="text-primary">Todo List</h1>
      <Task />
      <div className="container w-25 mt-5">
        {todos.map((todo, i) => (
          <ListItem
            key={i}
            className="mb-3 p-3 shadow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ flex: "1" }}>{todo.task}</span>
            <div>
              <IconButton onClick={() => handleEdit(todo._id)}>
                <EditIcon color="success" />
              </IconButton>
              <IconButton onClick={() => handleDelete(todo._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </div>
    </>
  );
};

export default Home;
