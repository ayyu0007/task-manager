// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className={task.completed ? 'completed' : ''}>{task.title}</span>
          <button onClick={() => onEdit(task.id)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Load tasks from local storage on mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
    setNewTask(taskToEdit.title);
  };

  const saveEditedTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id ? { ...task, title: newTask } : task
      )
    );
    setEditingTask(null);
    setNewTask('');
  };

  const clearEditing = () => {
    setEditingTask(null);
    setNewTask('');
  };

  const filteredTasks =
    filter === 'completed'
      ? tasks.filter((task) => task.completed)
      : filter === 'uncompleted'
      ? tasks.filter((task) => !task.completed)
      : tasks;

  return (
    <div className="app">
      <h1>Awesome Task Manager</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {editingTask ? (
          <>
            <button onClick={saveEditedTask}>Save</button>
            <button onClick={clearEditing}>Cancel</button>
          </>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      <div className="filter-options">
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="completed"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="uncompleted"
            checked={filter === 'uncompleted'}
            onChange={() => setFilter('uncompleted')}
          />
          Uncompleted
        </label>
      </div>
    </div>
  );
};

export default App;
