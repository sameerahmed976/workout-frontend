import React, { useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      setEmail("");
      setPassword("");
    }
    // setEmail("");
    // setPassword("");
    // toast.success("login is successfully", {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });
    // navigate("/home");
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
      <main className="main__login">
        <section className="login">
          <h2 className="login__heading">Login</h2>
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="form__control">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                className="login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__control">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                className="login__input"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to="/forgetPassword" className="forgetPassword">
                forget password?
              </Link>
            </div>
            <button
              className="btn btn--login"
              type="submit"
              disabled={isLoading}
            >
              Login
            </button>
          </form>
        </section>
        <p className="error">{error && error.message}</p>
      </main>
    </>
  );
};

export default Login;
