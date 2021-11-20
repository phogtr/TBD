import Head from "next/head";
import React from "react";

interface MetaProps {
  title?: string;
}

export const Meta: React.FC<MetaProps> = ({ title = "Next" }) => {
  return (
    <Head>
      {title !== "Next" ? "" : <link rel="icon" href="/favicon.ico" />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Head>
  );
};
