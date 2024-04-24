import { useState } from "react";

function FormLogin({ onLogin }) {
  const [input, setInput] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    
    onLogin()
  }

  return (
    <div>
      <div className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="Login" type="submit">
          Login
        </button>
      </div>
    </div>
  );
}

export default FormLogin;
