
export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
    
    return (
      <div className={`task-item ${task.completed ? "completed" : ""}`}>
        <div onClick={() => onToggle(task.id)}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
        </div>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    );
  }
  