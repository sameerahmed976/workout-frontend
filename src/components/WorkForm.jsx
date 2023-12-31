import React, { useState } from "react";
import useAuthContext from "../Hooks/AuthContext";
import useWorkouts from "../Hooks/useWorkouts";
import { toast } from "react-toastify";

const WorkForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkouts();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Un authorize access");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch(
      " https://workout-tracker-api-jbbj.onrender.com/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token} `,
        },
      }
    );
    // console.log(
    //   `* ~ file: WorkForm.jsx:21 ~ handleSubmit ~ response`,
    //   response
    // );
    const data = await response.json();

    // console.log(`* ~ file: WorkForm.jsx:25 ~ handleSubmit ~ data`, data);
    if (!response.ok) {
      //   console.log(data.message);
      setError(data.message);
      setLoad("");
      setReps("");
      setTitle("");
      toast.error("something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (response.ok) {
      dispatch({
        type: "CREATE_WORKOUTS",
        payload: data,
      });

      toast.success("workout  is created successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setError(null);
      setLoad("");
      setReps("");
      setTitle("");
    }
  };

  return (
    <>
      <section className="form__section">
        <h2 className="form__heading">Add new work out</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__control">
            <label htmlFor="title">Exercise Title :</label>
            <input
              type="text"
              name="title"
              autoFocus
              id="title"
              autoComplete="off"
              className="form__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form__control">
            <label htmlFor="load">Load (in Kgs) :</label>
            <input
              type="number"
              className="form__input"
              name="load"
              autoComplete="off"
              id="load"
              value={load}
              onChange={(e) => setLoad(+e.target.value)}
            />
          </div>
          <div className="form__control">
            <label htmlFor="reps">Reps :</label>
            <input
              type="number"
              autoComplete="off"
              name="reps"
              id="reps"
              className="form__input"
              value={reps}
              onChange={(e) => setReps(+e.target.value)}
            />
          </div>

          <button className="btn btn--submit" type="submit">
            Add Workout
          </button>
        </form>
        <p className="workout__error">{error ? error : null}</p>
      </section>
    </>
  );
};

export default WorkForm;
