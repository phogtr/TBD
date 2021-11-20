import React, { useState } from "react";
import Link from "next/link";

import { Meta } from "../components/Meta";

import { registerRequest } from "../api/user/user.api";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Meta title="Register" />
      <h1>Register</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const registerBody = {
            username,
            email,
            password,
          };
          try {
            const res = await registerRequest(registerBody);
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <div>
          <label>
            Username:
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
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
        <button type="submit">Register</button>
      </form>
      <Link href="/">Home</Link>
    </div>
  );
};
export default Register;
