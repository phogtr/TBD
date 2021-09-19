import { useState } from "react";
import { IUserData } from "./UserContext";

export const useLocalStorage = () => {
  const getUser = () => {
    const item = localStorage.getItem("user");
    const userData: IUserData = JSON.parse(item || "{}");
    return userData;
  };

  const [userData, setUser] = useState(getUser());

  const saveUserData = (userData: IUserData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return {
    userData,
    setUser: saveUserData,
  };
};
