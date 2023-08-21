import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DefaultPage = () => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const fetchInput = useRef(true);

  const getBgImage = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);

      const data = await response.json();
      if (data.message === "success") {
        setIsLoading(false);
        setImage(data);
      } else {
        setIsLoading(true);
        setImage(null);
      }
    } catch (error) {
      // console.log(error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    // if (fetchInput.current === true) {
    getBgImage(
      "https://workout-tracker-api-jbbj.onrender.com/api/workouts/image"
    );
    // console.log("object");
    // }

    // return () => {
    //   // fetchInput.current = false;
    // };
  }, []);

  return (
    <>
      <main className="defaultImage">
        {image?.message === "success" && (
          <div className="backgroundImage">
            <img src={image.src} alt="hero Image" className="bgImage" />
          </div>
        )}

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
