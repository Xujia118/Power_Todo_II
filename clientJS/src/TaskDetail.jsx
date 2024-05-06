import { useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAddNote, fetchNotes } from "./services";

function TaskDetail({
  notes,
  onFetchNotes,
  onAddNote,
  onDeleteNote,
  onUpdateNote,
}) {
  const { taskId } = useParams();
  const [newNote, setNewNote] = useState("");

  function handleClick() {
    onFetchNotes(taskId)
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchAddNote({ taskId, newNote })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          </li>
        ))}
      </ul>

      <form className="form-add-note" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Note..."
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="button-add-note" type="submit">
          Add Note
        </button>
      </form>
    </>
  );
}

export default TaskDetail;
