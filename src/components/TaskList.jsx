import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, name: updatedTask.name, description: updatedTask.description } : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure ?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <TaskForm 
        onSubmit={editingTask ? updateTask : addTask} 
        task={editingTask} 
        isEditing={!!editingTask} 
      />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          onToggle={toggleTaskCompletion}
        />
      ))}
    </div>
  );
}
