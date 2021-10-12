import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Meta } from "../components/Meta";
import axios from "../lib/axios";
import { useUser } from "../lib/useUser";

interface ILoginBody {
  email: string;
  password: string;
}

interface IloginProps {}

const Login: React.FC<IloginProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutateUser } = useUser({});

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
            const res = await axios.post("/api/login", loginBody);
            mutateUser({
              userId: res.data.userId,
              username: res.data.username,
              isLoggedIn: true,
            });
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
