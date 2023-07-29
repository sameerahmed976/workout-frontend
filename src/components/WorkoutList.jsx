import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
formatDistanceToNow;
import { FaTrashAlt } from "react-icons/fa";
const WorkoutList = ({ title, _id, reps, load, createdAt, handleDelete }) => {
  return (
    <>
      <article className="workout__card">
        <h4 className="workout__title">{title}</h4>
        <p className="workout__load">
          <strong>Load (kg) : {load} </strong>
        </p>
        <p className="workout__reps">
          <strong>reps : {reps} </strong>
        </p>
        <p className="workout__createdAt">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
        <button className="btn btn--delete" onClick={() => handleDelete(_id)}>
          <FaTrashAlt />
        </button>
      </article>
    </>
  );
};

export default WorkoutList;
