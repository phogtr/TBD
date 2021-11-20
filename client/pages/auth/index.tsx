import React from "react";
import { Navbar } from "../../components/Navbar";
import { useUser } from "../../lib/useUser";

const Auth: React.FC<{}> = ({}) => {
  const { userData } = useUser();

  if (!userData) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar authUser={userData} />
      <div>
        <h1>Auth</h1>
        {userData.isLoggedIn ? (
          <div>
            <h3>{userData.userId}</h3>
            <h3>{userData.username}</h3>
          </div>
        ) : (
          <h3>No data</h3>
        )}
      </div>
    </>
  );
};
export default Auth;
