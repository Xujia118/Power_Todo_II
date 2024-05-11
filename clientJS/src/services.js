function chainPromise(promise) {
  return promise
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

// Sessions
export function fetchSession() {
  const fetched = fetch("/api/v1/session");
  return chainPromise(fetched);
}

export function fetchLogin(credentials) {
  const fetched = fetch("/api/v1/session", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ credentials }),
  });

  return chainPromise(fetched);
}

export function fetchLogout() {
  const fetched = fetch("/api/v1/session", {
    method: "DELETE",
  });
  return chainPromise(fetched);
}

export function fetchRegister(newUser) {
  const fetched = fetch("/api/v1/session/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({newUser}),
  });
  return chainPromise(fetched);
}

// Tasks
export function fetchTasks() {
  const fetched = fetch("/api/v1/tasks");
  return chainPromise(fetched);
}

export function fetchAddTask(newTask) {
  const fetched = fetch("/api/v1/tasks/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ newTask }),
  });
  return chainPromise(fetched);
}

export function fetchDeleteTask(taskId) {
  const fetched = fetch(`/api/v1/tasks/${taskId}`, {
    method: "DELETE",
  });
  return chainPromise(fetched);
}

export function fetchUpdateTask({ taskId, updatedTask }) {
  const fetched = fetch(`/api/v1/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ updatedTask }),
  });
  return chainPromise(fetched);
}

// Notes
export function fetchNotes(taskId) {
  const fetched = fetch(`/api/v1/tasks/${taskId}/notes`);
  return chainPromise(fetched);
}

export function fetchAddNote(taskId, newNote) {
  const fetched = fetch(`/api/v1/tasks/${taskId}/notes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ newNote }),
  });
  return chainPromise(fetched);
}

export function fetchDeleteNote(taskId, noteId) {
  const fetched = fetch(`/api/v1/tasks/${taskId}/notes`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ noteId }),
  });
  return chainPromise(fetched);
}

export function fetchUpdateNote(taskId, noteId, updatedNote) {
  const fetched = fetch(`/api/v1/tasks/${taskId}/notes`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ updatedNote, noteId }),
  });
  return chainPromise(fetched);
}
