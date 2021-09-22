import React from "react";
import { Meta } from "./Meta";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Meta />
      <main>{children}</main>
    </>
  );
};
