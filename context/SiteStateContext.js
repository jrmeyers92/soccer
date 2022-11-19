import React, { useState, createContext } from "react";

export const SiteStateContext = createContext();

export const SiteStateProvider = (props) => {
  const [siteState, setSiteState] = useState({
    team: "JV",
    gender: "Boys",
  });
  return (
    <SiteStateContext.Provider value={[siteState, setSiteState]}>
      {props.children}
    </SiteStateContext.Provider>
  );
};
