import { useState } from "react";
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

  function handleClick() {
    onFetchNotes(taskId);
  }

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

  function handleDelete(noteIndex) {
    console.log("index:", noteIndex);
    fetchDeleteNote(taskId, noteIndex)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEdit(index) {
    console.log(index);
    // TODO
  }

  return (
    <>
      <button className="" onClick={handleClick}>
        GET Notes
      </button>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <span>{note}</span>
            <button
              className="button-edit"
              type="button"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            <button
              className="button-delete"
              type="button"
              onClick={() => handleDelete(index)}
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
