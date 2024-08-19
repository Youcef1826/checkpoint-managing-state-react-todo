import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, task, isEditing }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setDescription(task.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Fields required !");
      return;
    }
    onSubmit({ name, description, id: task?.id });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button type="submit">{isEditing ? "Update" : "Add Task"}</button>
    </form>
  );
}
