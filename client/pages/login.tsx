import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Meta } from "../components/Meta";

import { loginRequest } from "../api/user/user.api";
// import { useUser } from "../lib/useUser";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const { mutateUser } = useUser();

  return (
    <div>
      <Meta title="Login" />
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const loginBody = {
            email,
            password,
          };
          try {
            await loginRequest(loginBody);
            // mutateUser({
            //   userId: res.data.userId,
            //   username: res.data.username,
            //   isLoggedIn: true,
            // });
            router.push("/");
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
      <Link href="/">Home</Link>
    </div>
  );
};
export default Login;
