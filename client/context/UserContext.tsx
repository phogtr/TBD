import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface IUserData {
  userId?: string;
}

interface IUserContext {
  userData: IUserData;
  setUser: (data: IUserData) => void;
}

const UserContextInitialValues: IUserContext = {
  userData: {},
  setUser: () => {},
};

const UserContext = createContext<IUserContext>(UserContextInitialValues);

export const useAuth = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const { userData, setUser } = useLocalStorage();

  const value: IUserContext = {
    userData,
    setUser,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};
