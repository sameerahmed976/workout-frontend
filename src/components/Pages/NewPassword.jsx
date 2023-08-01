import useAuthContext from "../../Hooks/AuthContext";
import React, { useState } from "react";
import useResetPassword from "../../Hooks/useResetPassword";
import { Link, Navigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const { dispatch, data } = useAuthContext();
  //   console.log(`* ~ file: AboutMe.jsx:7 ~ AboutMe ~ data:`, data);
  //   console.log(`* ~ file: AboutMe.jsx:5 ~ AboutMe ~ user:`, user);
  const { resetPassword, error, isLoading } = useResetPassword();

  const { token, id } = useParams();
  //   console.log(`* ~ file: NewPassword.jsx:13 ~ NewPassword ~ id:`, id);
  //   console.log(`* ~ file: NewPassword.jsx:13 ~ NewPassword ~ token:`, token);

  // useEffect(() => {
  //   dispatch({
  //     type: "NEW_PASSWORD",
  //     payload: {
  //       token,
  //       id,
  //     },
  //   });
  // }, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(password, confirmPassword, id, token);
    setConfirmPassword("");
    setPassword("");
  };

  return (
    <main>
      <section className="about">
        <section className="main__login">
          <section className="login about__login ">
            <h2 className="login__heading  about__heading ">
              Reset the Password
            </h2>
            <form className="login__form  about__form " onSubmit={handleSubmit}>
              <div className="form__control about__control">
                <label htmlFor="password">New Password:</label>
                <input
                  type="text"
                  name="password"
                  autoComplete="off"
                  className="login__input"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form__control  about__control">
                <label htmlFor="email">Confirm password:</label>
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  className="login__input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                className="btn btn--login"
                type="submit"
                disabled={isLoading}
              >
                Submit
              </button>
            </form>
          </section>
          <p className="error">{error && error.message}</p>
          <p className="error">{data?.success && data.data.message}</p>
          <Link
            to="/"
            className="btn"
            onClick={dispatch({
              type: "LOGOUT",
            })}
          >
            Go back to Login
          </Link>
        </section>
      </section>
    </main>
  );
};

export default NewPassword;
