import React from "react";

function NoteList() {
  return (
    <>
      <div className="form-container">
        <span>Add notes: </span>
        <form className="form-add-notes">
          <button className="button-add-note">+</button>
        </form>
      </div>
    </>
  );
}

export default NoteList;
