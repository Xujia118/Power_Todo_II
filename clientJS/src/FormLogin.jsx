import { useState } from "react";

function FormLogin({ onLogin }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(input);
  }

  return (
    <div>
      <form className="form-login" onSubmit={handleSubmit}>
        <input
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
