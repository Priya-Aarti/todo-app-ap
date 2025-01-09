import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Add a new task on Enter key press
  const addTask = (e) => {
    if (e.key === "Enter" && task.trim()) {
      setTasks([...tasks, { text: task.trim(), completed: false }]);
      setTask("");
    }
  };

  // Mark a task as completed
  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    const completedTasks = updatedTasks.filter((t) => t.completed);
    const pendingTasks = updatedTasks.filter((t) => !t.completed);
    setTasks([...pendingTasks, ...completedTasks]);
  };

  // Remove a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Toggle "Show More" state
  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div
      style={{
        backgroundColor: "#fffacd", // Light pink aesthetic background
        color: "#000",
        fontFamily: "'Times New Roman', serif", // Handwriting-style font
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        borderRadius: "10px",
        boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>To-Do List</h2>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={addTask}
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "15px",
          border: "2px solid #000000",
          borderRadius: "5px",
          fontFamily: "'Times New Roman', serif",
        }}
      />

      {/* Tasks List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {(showAll ? tasks : tasks.slice(0, 4)).map((t, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              textDecoration: t.completed ? "line-through" : "none",
              color: t.completed ? "gray" : "#000",
              fontSize: "18px",
            }}
          >
            <span>{t.text}</span>
            <div>
              {!t.completed && (
                <button
                  onClick={() => completeTask(index)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#90ee90", // Light blue for the Complete button
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontFamily: "'Times New Roman', serif",
                  }}
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => removeTask(index)}
                style={{
                  backgroundColor: "#FF6F61", // Light red for Remove button
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Show More Button */}
      {tasks.length > 6 && (
        <button
          onClick={toggleShowAll}
          style={{
            width: "100%",
            marginTop: "15px",
            backgroundColor: "#87ceeb", // Light pink for Show More button
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            fontFamily: "'Times New Roman', serif",
            fontSize: "16px",
          }}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default TodoApp;

