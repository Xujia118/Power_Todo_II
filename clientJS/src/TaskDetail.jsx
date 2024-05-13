import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAddNote, fetchAdditionalNotes } from "./services";

function TaskDetail({
  recentNotes,
  additionalNotes,
  onFetchRecentNotes,
  onFetchAdditionalNotes,
  onAddNote,
  onDeleteNote,
  onUpdateNote,
}) {
  const { taskId } = useParams();
  const [newNote, setNewNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddNote(taskId, newNote);
    setNewNote("");
  }

  function handleDelete(noteId) {
    onDeleteNote(taskId, noteId);
    window.location.reload(); // While LF a better solution...
  }

  function handleEdit(noteId) {
    onUpdateNote(taskId, noteId, newNote);
  }

  useEffect(() => {
    onFetchRecentNotes(taskId);
    onFetchAdditionalNotes(taskId);
  }, [taskId]);

  return (
    <>
      <form className="form-add-note" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="button-add-note" type="submit">
          Add Note
        </button>
      </form>

      <ul>
        {recentNotes.map((note) => (
          <li key={note._id}>
            <span>{note.text}</span>
            <span>{note.done}</span>
            <button
              className="button-edit"
              type="button"
              onClick={() => handleEdit(note._id)}
            >
              Edit
            </button>
            <button
              className="button-delete"
              type="button"
              onClick={() => handleDelete(note._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      <ul>
        {additionalNotes.map((note) => (
          <li key={note._id}>
            <span>{note.text}</span>
            <span>{note.done}</span>
            <button
              className="button-edit"
              type="button"
              onClick={() => handleEdit(note._id)}
            >
              Edit
            </button>
            <button
              className="button-delete"
              type="button"
              onClick={() => handleDelete(note._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskDetail;
