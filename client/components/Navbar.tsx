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
      </ul>
    </nav>
  );
};
