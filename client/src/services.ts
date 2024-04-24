function chainPromise(promise: Promise<Response>): Promise<any> {
  return promise
    .catch((err: Error) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err: any) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchSession(): Promise<any> {
  const fetched = fetch("/api/v1/session");
  return chainPromise(fetched);
}

export function fetchLogin(username: string): Promise<any> {
  const fetched = fetch("/api/v1/session", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  return chainPromise(fetched);
}

