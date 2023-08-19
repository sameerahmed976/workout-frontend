import React, { useState } from "react";
import useAuthContext from "../../Hooks/AuthContext";
import { useForgetPassword } from "../../Hooks/useForgetPassword";

const ForgetPassword = () => {
  const { user, data } = useAuthContext();
  // console.log(`* ~ file: AboutMe.jsx:7 ~ AboutMe ~ data:`, data);
  // console.log(`* ~ file: AboutMe.jsx:5 ~ AboutMe ~ user:`, user);
  const { forgetPassword, error, isLoading } = useForgetPassword();

  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPassword(email);
    setEmail("");
  };

  return (
    <>
      <main>
        <section className="main__login">
          <section className="login about__login ">
            <h2 className="login__heading  about__heading ">Forget Password</h2>
            <form className="login__form  about__form " onSubmit={handleSubmit}>
              <div className="form__control about__control">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="login__input"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div className="form__control  about__control">
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
              </div> */}

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
      </main>
    </>
  );
};

export default ForgetPassword;
