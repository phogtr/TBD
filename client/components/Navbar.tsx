import Link from "next/link";
import React from "react";

interface INavProps {}

export const Navbar: React.FC<INavProps> = ({}) => {
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
