// Imports
import React, { Children, createContext, useEffect, useState } from "react";


const DirectCallContext = createContext({
  contactedUser: null,
  callInfo: null,
  setContactedUser: () => {},
  setCallInfo: () => {},

});

const DirectCallProvider = ({ children }) => {
  const [contactedUser, setContactedUser] = useState(undefined);
  const [callInfo, setCallInfo] = useState(undefined);


  return (
    <DirectCallContext.Provider
      value={{ contactedUser, callInfo, setContactedUser, setCallInfo }}
    >
      {children}
    </DirectCallContext.Provider>
  );
};
export { DirectCallContext, DirectCallProvider };
