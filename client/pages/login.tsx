import axios from "axios";
import React, { useState } from "react";
import { Meta } from "../components/Meta";
import { server } from "../config";
import { useAuth } from "../context/UserContext";

interface ILoginBody {
  email: string;
  password: string;
}

interface IloginProps {}

const Login: React.FC<IloginProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  return (
    <div>
      <Meta title="Login" />
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const loginBody: ILoginBody = {
            email,
            password,
          };
          try {
            const res = await axios.post(`${server}/api/login`, loginBody, {
              withCredentials: true,
            });
            console.log(res.data);
            setUser(res.data);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <div>
          <label>
            Email:
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
