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
  setUser: () => {},
  switchUser: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  if (!user) return <Loader />;

  return (
    <AuthContext.Provider value={{ user, setUser, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
