import React from "react";
import { Meta } from "./Meta";
import { Navbar } from "./Navbar";

interface ILayoutProps {}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main>{children}</main>
    </>
  );
};
