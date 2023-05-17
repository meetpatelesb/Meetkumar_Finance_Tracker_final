import React from "react";

export const Dropdown = (props) => {
  return (
    <>
      {props.for.map((field) => (
        <>
          <option value={field}>{field} </option>
        </>
      ))}
    </>
  );
};
