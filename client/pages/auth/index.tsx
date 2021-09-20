import React from "react";
import { useUser } from "../../lib/useUser";

interface IauthProps {}

const Auth: React.FC<IauthProps> = ({}) => {
  const { userData } = useUser({
    redirecTo: "/",
  });

  return (
    <div>
      <h1>Auth</h1>
      {userData ? <h3>{userData.userId}</h3> : <h3>No data</h3>}
    </div>
  );
};
export default Auth;
