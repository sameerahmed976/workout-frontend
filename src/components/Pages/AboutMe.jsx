import useAuthContext from "../../Hooks/AuthContext";
import React, { useState } from "react";
import useResetPassword from "../../Hooks/useResetPassword";
import { toast } from "react-toastify";

const AboutMe = () => {
  const { user, data } = useAuthContext();
  // console.log(`* ~ file: AboutMe.jsx:7 ~ AboutMe ~ data:`, data);
  // console.log(`* ~ file: AboutMe.jsx:5 ~ AboutMe ~ user:`, user);
  const { resetPassword, error, isLoading } = useResetPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(password, confirmPassword);

    if (!error) {
      setConfirmPassword("");
      setPassword("");
    }
  };

  return (
    <main>
      <section className="about">
        <h2 className="about__name">User Name : {user?.username}</h2>

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
        </section>
      </section>
    </main>
  );
};

export default AboutMe;
