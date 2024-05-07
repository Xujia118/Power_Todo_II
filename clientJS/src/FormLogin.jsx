import { useState } from "react";

import "./FormLogin.css";

function FormLogin({ onLogin }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(input);
  }

  return (
    <div className="login-container">
      <h1 className="main-logo">Power Todo</h1>
      <form className="form-login" onSubmit={handleSubmit}>
        <input
        className="login-input"
          type="text"
          name="username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default FormLogin;
