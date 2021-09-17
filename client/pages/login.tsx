import React from "react";
import { Meta } from "../components/Meta";

interface IloginProps {}

const Login: React.FC<IloginProps> = ({}) => {
  return (
    <div>
      <Meta title="Login" />
      <h1>Login</h1>
    </div>
  );
};
export default Login;
