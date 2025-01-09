import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [visibleCount, setVisibleCount] = useState(5); // Initial number of visible tasks

  // Function to handle adding a new to-do via form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo('');
    }
  };

  // Function to toggle completion status of a to-do
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a to-do
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Show more function: Increases the number of visible tasks by 5
  const showMore = () => {
    setVisibleCount(visibleCount + 5);
  };

  // Show less function: Decreases the number of visible tasks by 5
  const showLess = () => {
    setVisibleCount(visibleCount - 5);
  };

  // Sorting the tasks, with completed ones at the bottom
  const sortedTodos = [
    ...todos.filter((todo) => !todo.completed), // Non-completed tasks
    ...todos.filter((todo) => todo.completed), // Completed tasks
  ];

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>

      {/* Form for adding new to-do */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      {/* Render visible todo items */}
      <TodoList
        todos={sortedTodos.slice(0, visibleCount)} // Only show the visible tasks
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      {/* Show more or show less button */}
      {todos.length > visibleCount && (
        <button onClick={showMore} className="show-more">
          Show More
        </button>
      )}

      {visibleCount > 5 && (
        <button onClick={showLess} className="show-less">
          Show Less
        </button>
      )}
    </div>
  );
};

const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <ul>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => (
  <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
    />
    <span>{todo.text}</span>
    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  </li>
);

export default App;
