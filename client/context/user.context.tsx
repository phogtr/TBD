import { createContext, FC, useContext, useState } from "react";

export interface IUser {
  userId?: string;
}

interface IUserContext {
  user?: IUser;
  setUser: (data: IUser) => void;
}

const UserContextInitialValues: IUserContext = {
  user: {},
  setUser: () => {},
};

const UserContext = createContext<IUserContext>(UserContextInitialValues);

export function useAuth() {
  return useContext(UserContext);
}

interface IUserProviderProps {
  initialUser?: IUser;
}

export const UserProvider: FC<IUserProviderProps> = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  const value: IUserContext = {
    user,
    setUser,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};
