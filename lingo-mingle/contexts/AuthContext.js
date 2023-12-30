// Imports
import React, { Children, createContext, useEffect, useState } from "react";

// Components
import { Loader } from "../components/common";

// Services
import api from "../services/api";

// Hook
import useNotification from "../hooks/useNotification";

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  switchUser: () => {},
  switchToken: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWVZCd1hrTjdjSWs3V21aOG9VWEcifQ.yufN7vKkauON38gmMyvUwmITiqDjr05SstG1fKqp-6A"
  );
  const [myUuid, setMyUuid] = useState("YVBwXkN7cIk7WmZ8oUXG");

  const notify = useNotification();

  useEffect(() => {
    api
      .getUser(myUuid)
      .then((userData) => {
        setUser({ ...userData, uuid: myUuid });
        notify.success(`Welcome back ${userData.username}`);
      })
      .catch((err) => {
        setUser(undefined);
        notify.error(err);
      });
  }, [myUuid]);

  const switchUser = (newUserId) => {
    setMyUuid(newUserId);
  };

  const switchToken = (newUserToken) => {
    setToken(newUserToken);
  };

  if (!user) return <Loader />;

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, switchUser, switchToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
