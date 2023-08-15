import React, { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/AuthContext";
import useWorkouts from "../../Hooks/useWorkouts";
import WorkForm from "../WorkForm";
import WorkoutList from "../WorkoutList";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthContext();
  // console.log(`* ~ file: Home.jsx:9 ~ Home ~ user`, user);
  const { workouts, dispatch } = useWorkouts();


  

  const handleDelete = async (id) => {
    if (!user) {
      return;
    }

    const response = await fetch(
      " https://workout-tracker-api-jbbj.onrender.com/api/workouts/" + id,
      // " https://workout-tracker-api-jbbj.onrender.com/api/workouts/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    // console.log(
    //   `* ~ file: WorkForm.jsx:21 ~ handleSubmit ~ response`,
    //   response
    // );
    const data = await response.json();
    dispatch({
      type: "DELETE_WORKOUTS",
      payload: data,
    });
    // console.log(data);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // " https://workout-tracker-api-jbbj.onrender.com/api/workouts",
        " https://workout-tracker-api-jbbj.onrender.com/api/workouts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(`* ~ file: Home.jsx:9 ~ fetchData ~ response`, response);

      const data = await response.json();
      // console.log(`* ~ file: Home.jsx:11 ~ fetchData ~ data`, data);

      if (response.ok) {
        dispatch({
          type: "SET_WORKOUTS",
          payload: data,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

  return (
    <>
      <main className="main">
        <section className="workout">
          {!workouts?.length ? (
            <h2 className="workout__none">No Work outs</h2>
          ) : (
            workouts?.map((workout) => {
              return (
                <WorkoutList
                  key={workout._id}
                  {...workout}
                  handleDelete={handleDelete}
                />
              );
            })
          )}
        </section>
        <WorkForm />
      </main>
    </>
  );
};

export default Home;
