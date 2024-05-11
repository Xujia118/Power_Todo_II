import { useState } from "react";

import { fetchRegister } from "./services";

import "./FormLogin.css";

function FormLogin({ onLogin }) {
  const [register, setRegister] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Handle input
  function handleInput(setter) {
    return function (e) {
      setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  }
  const handleRegisterInput = handleInput(setNewUser);
  const handleLoginInput = handleInput(setCredentials);

  // Handle submit
  function handleSubmitRegister(e) {
    e.preventDefault();
    fetchRegister(newUser);
    setNewUser({
      username: "",
      password: "",
      email: "",
    });
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    onLogin(credentials);
    setCredentials({
      username: "",
      password: "",
    });
  }

  return (
    <div className="login-container">
      <h1 className="main-logo">Power Todo</h1>

      <div className="form-wrapper">
        {register ? (
          <form className="form-register" onSubmit={handleSubmitRegister}>
            <div className="form-container">
              <label htmlFor="register-username" />
              Username:
              <input
                type="text"
                id="register-username"
                name="username"
                value={newUser.username}
                onChange={handleRegisterInput}
              />
            </div>
            <div className="form-container">
              <label htmlFor="register-password" />
              Password:
              <input
                type="password"
                id="register-password"
                name="password"
                value={newUser.password}
                onChange={handleRegisterInput}
              />
            </div>
            <div className="form-container">
              <label htmlFor="email" />
              Email:
              <input
                type="text"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleRegisterInput}
              />
            </div>
            <div className="button-container">
              <button className="button-register" type="submit">
                Register
              </button>
            </div>
            <div className="switch-container">
              <span className="switch" onClick={() => setRegister(!register)}>
                I have an account
              </span>
            </div>
          </form>
        ) : (
          <form className="form-login" onSubmit={handleSubmitLogin}>
            <div className="form-container">
              <label htmlFor="login-username" />
              Username:
              <input
                className="login-input"
                id="login-username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleLoginInput}
              />
            </div>

            <div className="form-container">
              <label htmlFor="login-password" />
              Password:
              <input
                className="login-input"
                id="login-password"
                type="text"
                name="password"
                value={credentials.password}
                onChange={handleLoginInput}
              />
            </div>
            <div className="button-container">
              <button className="button-login" type="submit">
                Login
              </button>
            </div>
            <div className="switch-container">
              <span className="switch" onClick={() => setRegister(!register)}>
                Register
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default FormLogin;
