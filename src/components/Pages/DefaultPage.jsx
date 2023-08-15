import React from "react";
import { Link } from "react-router-dom";

const DefaultPage = () => {
  return (
    <>
      <main>
        <h2 className="default__title">Workout Tracker</h2>

        <div className="btn__group">
          <Link to="/signup" className="btn">
            Sign up
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </main>
    </>
  );
};

export default DefaultPage;
