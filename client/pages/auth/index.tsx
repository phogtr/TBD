import React from "react";
import { Navbar } from "../../components/Navbar";
import { useUser } from "../../lib/useUser";

const Auth: React.FC<{}> = ({}) => {
  const { userData } = useUser({});

  return (
    <>
      <Navbar authUser={userData} />
      <div>
        <h1>Auth</h1>
        {userData ? <h3>{userData.userId}</h3> : <h3>No data</h3>}
      </div>
    </>
  );
};
export default Auth;
