import React, { useState } from 'react';

const Task = ({ task, onTaskToggle, onTaskEdit, onTaskDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    if (editedTitle.trim() !== '') {
      onTaskEdit(task.id, editedTitle);
      setEditing(false);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onTaskToggle(task.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onTaskDelete(task.id)}>Delete</button>
    </li>
  );
};

export default Task;
