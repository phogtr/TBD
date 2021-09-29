import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import axios from "../lib/axios";

interface INavbarProps {
  authUser: {
    isLoggedIn: boolean;
  };
}

export const Navbar: React.FC<INavbarProps> = ({ authUser }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post("/api/logout", undefined);
    router.push("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        {authUser.isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
        <li>
          <Link href="/auth">Auth</Link>
        </li>
        <li>
          <Link href="/auth/ssr">Auth SSR</Link>
        </li>
      </ul>
    </nav>
  );
};
