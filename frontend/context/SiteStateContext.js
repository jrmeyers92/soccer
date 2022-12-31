import React, { useState, createContext } from "react";

export const SiteStateContext = createContext();

export const SiteStateProvider = (props) => {
  // let team, gender;
  // if (
  //   typeof window !== "undefined" &&
  //   localStorage.getItem("team") &&
  //   localStorage.getItem("gender")
  // ) {
  //   // Perform localStorage action
  //   team = window.localStorage.getItem("team");
  //   gender = window.localStorage.getItem("gender");
  // } else {
  //   (team = "JV"), (gender = "Girls");
  // }

  let team = "Varsity";
  let gender = "Boys";

  const [siteState, setSiteState] = useState({
    team: team,
    gender: gender,
  });
  return (
    <SiteStateContext.Provider value={[siteState, setSiteState]}>
      {props.children}
    </SiteStateContext.Provider>
  );
};
