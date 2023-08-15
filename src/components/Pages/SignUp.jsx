import React, { useState } from "react";
import useSignUp from "../../Hooks/useSignUp";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { error, signup, isLoading } = useSignUp();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, username);
    setUsername("");
    setEmail("");
    setPassword("");

    navigate("/home");
  };

  if (isLoading) {
    return (
      <main>
        <h2 className="main__loading">Loading...</h2>
      </main>
    );
  }

  return (
    <>
      <main className="main__signup">
        <section className="signup">
          <h2 className="signup__heading">Sign Up</h2>
          <form className="signup__form" onSubmit={handleSubmit}>
            <div className="form__control">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                className="signup__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__control">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                className="signup__input"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__control">
              <label htmlFor="username">username:</label>
              <input
                type="text"
                name="username"
                id="username"
                className="signup__input"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              className="btn btn--signup"
              type="submit"
              disabled={isLoading}
            >
              Sign up
            </button>
          </form>
        </section>
        <p className="error">{error && error.message}</p>
      </main>
    </>
  );
};

export default SignUp;
