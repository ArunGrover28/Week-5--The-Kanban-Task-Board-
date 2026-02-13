
import React, { useState } from "react";

function Column({ title, tasks, status, nextStatus, deleteTask, moveTask, editTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function startEdit(task) {
    setEditingId(task.id);
    setEditValue(task.task);
  }

  function saveEdit(id) {
    editTask(id, editValue);
    setEditingId(null);
  }

  return (
    <div className="column">
      <h2>{title}</h2>

      {tasks
        .filter(task => task.status === status)
        .map(task => (
          <div key={task.id} className="card mt-4 p-5 " style={{border:`3px solid ${task.ptr}`}}>
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
                <button
                  onClick={() => saveEdit(task.id)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <p onDoubleClick={() => startEdit(task)} className="cursor-pointer">
                {task.task}
              </p>
            )}

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              {nextStatus && (
                <button
                  onClick={() => moveTask(task.id, nextStatus)}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  Move
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Column;