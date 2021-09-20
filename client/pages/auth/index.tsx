import axios from "axios";
import React, { useEffect } from "react";
import { server } from "../../config";
import { useAuth } from "../../context/user.context";

interface IauthProps {}

const Auth: React.FC<IauthProps> = ({}) => {
  const { user, setUser } = useAuth();

  const getUser = async () => {
    try {
      const res = await axios.get(`${server}/auth`, { withCredentials: true });
      const authUser = {
        userId: res.data,
      };
      setUser(authUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("run effect");
      getUser();
    }
  }, []);

  return (
    <div>
      <h1>Auth</h1>
      {user ? <h3>{user.userId}</h3> : <h3>No data</h3>}
    </div>
  );
};
export default Auth;
