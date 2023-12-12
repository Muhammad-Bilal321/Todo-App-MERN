import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const Task = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      console.log(task);
      const response = await axios.post("http://localhost:3001/add", {
        task: task,
      });
      console.log(response.data);
      // Add any logic you need after a successful request
    } catch (error) {
      console.error("Error:", error);
      // Add user-friendly error handling, such as displaying an alert
    } finally {
      setLoading(false);
      window.location.reload(); // Reload the page
    }
  };

  return (
    <div className="my-4">
      <TextField
        onChange={(e) => setTask(e.target.value)}
        value={task}
        id="standard-basic"
        label="Add Task"
        variant="standard"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        className="my-2 mx-2"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </Button>
    </div>
  );
};

export default Task;
