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

export function fetchSession() {
  const fetched = fetch("/api/v1/session");
  return chainPromise(fetched);
}

export function fetchLogin(username) {
  const fetched = fetch("/api/v1/session", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  return chainPromise(fetched);
}
