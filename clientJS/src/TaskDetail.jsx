import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAddNote, fetchDeleteNote, fetchNotes } from "./services";

function TaskDetail({
  notes,
  onFetchNotes,
  onAddNote,
  onDeleteNote,
  onUpdateNote,
}) {
  const { taskId } = useParams();
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetchAddNote(taskId, note)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(noteId) {
    console.log("id:", noteId);
    fetchDeleteNote(taskId, noteId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEdit(noteId) {
    console.log("id:", noteId);
    fetchDeleteNote(taskId, noteId, note)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    onFetchNotes(taskId)
  }, [taskId])

  return (
    <>

      <ul>
        {Object.values(notes).map(note => (
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

      <form className="form-add-note" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Note..."
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="button-add-note" type="submit">
          Add Note
        </button>
      </form>
    </>
  );
}

export default TaskDetail;
