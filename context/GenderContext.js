import React, { useState, createContext } from "react";

export const GenderContext = createContext();

export const GenderProvider = (props) => {
  const [gender, setGender] = useState("Boys");
  return (
    <GenderContext.Provider value={[gender, setGender]}>
      {props.children}
    </GenderContext.Provider>
  );
};
