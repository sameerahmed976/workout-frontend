import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

const useWorkouts = () => {
  const context = useContext(WorkoutsContext);
  return context;
};

export default useWorkouts;
