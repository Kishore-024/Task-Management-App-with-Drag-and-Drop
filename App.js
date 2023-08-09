import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'; 
import './TaskManager.css'; 

function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: uuid(), title: 'Task 1', status: 'todo' },
    { id: uuid(), title: 'Task 2', status: 'inProgress' },
    { id: uuid(), title: 'Task 3', status: 'done' },
  ]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="task-manager">
      <div
        className="task-column"
        onDragOver={e => handleDragOver(e)}
        onDrop={e => handleDrop(e, 'todo')}
      >
        <h2>To Do</h2>
        <ul>
          {tasks.map(task => {
            if (task.status === 'todo') {
              return (
                <li
                  key={task.id}
                  draggable
                  onDragStart={e => handleDragStart(e, task.id)}
                >
                  {task.title}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div
        className="task-column"
        onDragOver={e => handleDragOver(e)}
        onDrop={e => handleDrop(e, 'inProgress')}
      >
        <h2>In Progress</h2>
        {/* Similar mapping as above, with status 'inProgress' */}
      </div>
      <div
        className="task-column"
        onDragOver={e => handleDragOver(e)}
        onDrop={e => handleDrop(e, 'done')}
      >
        <h2>Done</h2>
        {/* Similar mapping as above, with status 'done' */}
      </div>
    </div>
  );
}

export default TaskManager;
